import "server-only"
import { list, type ListBlobResultBlob } from "@vercel/blob"
import { unstable_cache } from "next/cache"
import {
  RESOURCE_CATEGORIES,
  type Resource,
  type ResourceCategory,
} from "@/lib/resource-categories"

const RESOURCE_PREFIX = "recursos/"
const CATEGORY_BY_SLUG = new Map<string, ResourceCategory>(
  RESOURCE_CATEGORIES.map(({ slug, label }) => [slug, label]),
)

function hasBlobCredentials() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  )
}

function getFileTitle(pathname: string) {
  const encodedFileName = pathname.split("/").at(-1)

  if (!encodedFileName) {
    return null
  }

  let fileName = encodedFileName

  try {
    fileName = decodeURIComponent(encodedFileName)
  } catch {
    // Keep the original pathname segment when an uploaded name contains an invalid escape.
  }

  if (fileName.toLocaleLowerCase("en").endsWith(".ds_store")) {
    return null
  }

  const title = fileName
    .replace(/\.[^./]+$/, "")
    .replace(/-[a-z0-9]{30}$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .normalize("NFC")

  return title ? title.charAt(0).toLocaleUpperCase("es") + title.slice(1) : null
}

function toResource(blob: ListBlobResultBlob): Resource | null {
  const [, categorySlug] = blob.pathname.split("/")
  const category = CATEGORY_BY_SLUG.get(categorySlug)
  const title = getFileTitle(blob.pathname)

  if (!category || !title) {
    return null
  }

  return {
    title,
    category,
    href: blob.downloadUrl,
  }
}

async function listResources(storeId: string): Promise<readonly Resource[]> {
  // The non-secret store ID is part of the cache key through this argument.
  void storeId

  try {
    const blobs: ListBlobResultBlob[] = []
    let cursor: string | undefined

    do {
      const result = await list({
        prefix: RESOURCE_PREFIX,
        limit: 1000,
        cursor,
      })

      blobs.push(...result.blobs)
      cursor = result.hasMore ? result.cursor : undefined
    } while (cursor)

    const resources: Resource[] = []

    for (const blob of blobs.toSorted(
      (first, second) => second.uploadedAt.getTime() - first.uploadedAt.getTime(),
    )) {
      const resource = toResource(blob)

      if (resource) {
        resources.push(resource)
      }
    }

    return resources
  } catch (error) {
    console.error("Unable to list documents from Vercel Blob.", error)
    return []
  }
}

const getCachedResources = unstable_cache(listResources, ["resources-v4"], {
  revalidate: 3600,
  tags: ["resources"],
})

export async function getResources(): Promise<readonly Resource[]> {
  if (!hasBlobCredentials()) {
    console.warn(
      "Vercel Blob credentials are unavailable; rendering the resource library without documents.",
    )
    return []
  }

  return getCachedResources(process.env.BLOB_STORE_ID ?? "token-authenticated-store")
}

import type { ResourceLibraryBlock } from "@/payload-types";
import { getDocumentLibrary } from "@/lib/data/engage";
import { mediaSrc } from "@/components/ui/media-image";
import { ResourceLibrary } from "@/components/sections/resource-library";

export async function ResourceLibraryBlockComponent({
  block,
}: {
  readonly block: ResourceLibraryBlock;
}) {
  const { categories, documents } = await getDocumentLibrary();
  const labels = new Map(categories.map((category) => [category.id, category.label]));

  return (
    <ResourceLibrary
      {...block}
      categories={categories}
      documents={documents.map((doc) => ({
        id: doc.id,
        title: doc.title,
        categoryId: doc.categoryId,
        categoryLabel: (doc.categoryId !== null && labels.get(doc.categoryId)) || "",
        href: mediaSrc(doc.url),
      }))}
    />
  );
}

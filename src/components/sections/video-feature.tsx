import type { VideoFeatureBlock } from "@/payload-types";
import { resolveLink } from "@/lib/links";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type VideoFeatureProps = Omit<VideoFeatureBlock, "blockType" | "blockName" | "id">;

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function VideoFeature({
  eyebrow,
  heading,
  intro,
  channelLink,
  youtubeId,
  videoTitle,
  settings,
}: VideoFeatureProps) {
  const channel = resolveLink(channelLink);
  const videoId = YOUTUBE_ID.test(youtubeId) ? youtubeId : null;

  return (
    <Section id={settings?.anchorId} tone="surface" spacing="relaxed">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
          <Heading text={heading} className="max-w-[12ch] text-text" />
          {intro ? (
            <p className="mt-5 max-w-[46ch] font-body text-[17px] leading-[1.65] text-text-muted">
              {intro}
            </p>
          ) : null}
          {channel ? (
            <ButtonLink
              href={channel.href}
              newTab={channel.newTab}
              variant="outlineMd"
              className="mt-7"
            >
              {channel.label}
              <Icon name="external-link" className="h-4 w-4" strokeWidth={1.75} />
            </ButtonLink>
          ) : null}
        </div>

        {videoId ? (
          <div className="overflow-hidden rounded-lg border border-border bg-primary shadow-[var(--shadow-card)]">
            {/*
              YouTube's player needs allow-scripts + allow-same-origin to run. The rule forbids the pair
              because it lets a same-origin frame remove its own sandbox; this frame is cross-origin
              (youtube-nocookie.com), so the remaining restrictions still apply.
            */}
            <iframe
              className="aspect-video w-full"
              // oxlint-disable-next-line react/iframe-missing-sandbox
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={videoTitle}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

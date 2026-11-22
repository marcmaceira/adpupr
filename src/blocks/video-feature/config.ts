import type { Block } from "payload";
import { headline, link, sectionSettings, text } from "../../payload/fields";

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * Video feature: a short introduction with a channel button next to an embedded YouTube
 * video (privacy-enhanced youtube-nocookie.com player).
 */
export const VideoFeatureBlock: Block = {
  slug: "videoFeature",
  interfaceName: "VideoFeatureBlock",
  labels: { singular: "Featured video", plural: "Featured videos" },
  admin: { group: "Content" },
  fields: [
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    text("intro", "Text", { textarea: true }),
    link({
      name: "channelLink",
      label: "Channel button",
      description: "Shown with an external link icon.",
    }),
    {
      type: "row",
      fields: [
        {
          name: "youtubeId",
          type: "text",
          label: "YouTube video ID",
          required: true,
          admin: {
            width: "40%",
            description:
              "The 11 characters after «v=» or «youtu.be/» in the video link. For example: jhXQO0PB0PY",
          },
          validate: (value: unknown) =>
            typeof value === "string" && YOUTUBE_ID_PATTERN.test(value)
              ? true
              : "Enter the video's 11-character ID (letters, numbers, - or _).",
        },
        {
          name: "videoTitle",
          type: "text",
          label: "Accessible video title",
          required: true,
          admin: {
            width: "60%",
            description: "Announced by screen readers. Describe the video briefly.",
          },
        },
      ],
    },
    sectionSettings(),
  ],
};

import type { VideoFeatureBlock } from "@/payload-types";
import { VideoFeature } from "@/components/sections/video-feature";

export function VideoFeatureBlockComponent({ block }: { readonly block: VideoFeatureBlock }) {
  return <VideoFeature {...block} />;
}

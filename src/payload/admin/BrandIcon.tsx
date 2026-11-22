import Image from "next/image";

/** Navigation icon: the round ADPUPR mark. */
export function BrandIcon() {
  return (
    <Image
      className="adpupr-cms-icon"
      src="/icon.png"
      alt="ADPUPR CMS"
      width={192}
      height={192}
      unoptimized
    />
  );
}

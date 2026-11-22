import Image from "next/image";

/** Login-page logo: the ADPUPR wordmark followed by "CMS", in a light and a dark version. */
export function BrandLogo() {
  return (
    <span className="adpupr-cms-logo">
      <Image
        className="adpupr-cms-logo__mark adpupr-cms-logo__mark--light"
        src="/logo-color.png"
        alt="ADPUPR"
        width={710}
        height={200}
        priority
        unoptimized
      />
      <Image
        className="adpupr-cms-logo__mark adpupr-cms-logo__mark--dark"
        src="/logo-white.png"
        alt="ADPUPR"
        width={710}
        height={200}
        priority
        unoptimized
      />
      <span className="adpupr-cms-logo__label">CMS</span>
    </span>
  );
}

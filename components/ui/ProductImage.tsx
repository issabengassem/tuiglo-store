import Image from "next/image";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface Props {
  src: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * The single place that decides "real photo vs. placeholder" — every
 * product-image slot renders through here, so wiring in real photos later
 * (setting `images.primary` in data/products/*.ts) is a data-only change,
 * no component edits needed.
 */
export function ProductImage({ src, alt, className = "", sizes }: Props) {
  if (!src) {
    return <ImagePlaceholder className={className} />;
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes ?? "100vw"} className="object-contain" />
    </div>
  );
}

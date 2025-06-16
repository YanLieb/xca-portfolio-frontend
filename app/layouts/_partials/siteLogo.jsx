import { assetsUrl } from "@/strapi";
import Image from "next/image";
import Link from "next/link";

export default function SiteLogo({ logo, classes = "" }) {
  return (
    <Link href="/" className={classes}>
      <Image
        src={logo.url}
        alt={logo.alternativeText ?? logo.name}
        width={logo.width}
        height={logo.height}
        priority
      />
    </Link>
  );
}

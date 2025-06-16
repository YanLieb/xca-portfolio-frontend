"use client";

import Image from "next/image";
import { assetsUrl } from "@/strapi";

import "./ImageComponent.css";

export default function ImageComponent({ media, classes }) {
  return (
    <div className={classes} style={media.style ? { ...media.style } : {}}>
      <Image
        alt={
          media.image.alternativeText ??
          media.alternativeText ??
          media.component_id
        }
        height={media.image.height ?? media.height}
        width={media.image.width ?? media.width}
        src={`${media.image.url}`}
        priority={media.preload}
      />
    </div>
  );
}

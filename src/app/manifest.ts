import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kliqnet Digital",
    short_name: "Kliqnet",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1017",
    theme_color: "#0c1017",
    icons: [192, 512].map(size => ({
      src: `/icons/kliqnet-${size}-20260916.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    })),
  };
}

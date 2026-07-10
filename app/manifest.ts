import type { MetadataRoute } from "next";
import { profile } from "@/lib/data/resume";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.shortName} | AI Engineer & Mathematics Teacher`,
    short_name: profile.shortName,
    description: profile.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#fbfbf9",
    theme_color: "#fbfbf9",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}

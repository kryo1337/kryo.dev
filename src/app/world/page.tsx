import type { Metadata } from "next";
import WorldClient from "@/components/world/WorldClient";

export const metadata: Metadata = {
  title: "world",
  description: "Walk around a minecraft hub and explore my projects",
  alternates: {
    canonical: "/world",
  },
  openGraph: {
    type: "website",
    url: "/world",
    title: "world | kryo.dev",
    description: "Walk around a minecraft hub and explore my projects",
  },
};

export default function WorldPage() {
  return <WorldClient />;
}

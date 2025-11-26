import type { Metadata } from "next"
import { getToolMetadata } from "@/lib/tool-metadata"
import { CompressImageClientPage } from "@/app/tools/compress-image/client-page"

export const metadata: Metadata = getToolMetadata("compress-image")

export default function CompressImagePage() {
  return <CompressImageClientPage />
}

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const cloudConvertApiKey = process.env.CLOUDCONVERT_API_KEY

    if (!cloudConvertApiKey) {
      console.log("[v0] CloudConvert API key not configured - using mock conversion")
      // Mock DOCX response for development
      return new NextResponse(
        Buffer.from("PK\x03\x04"), // ZIP/DOCX magic bytes
        { headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" } },
      )
    }

    const buffer = await file.arrayBuffer()
    const fileBlob = new Blob([buffer], { type: "application/pdf" })

    const cloudFormData = new FormData()
    cloudFormData.append("file", fileBlob, file.name)
    cloudFormData.append("input", "upload")
    cloudFormData.append("output", "docx")

    const response = await fetch("https://api.cloudconvert.com/v2/convert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cloudConvertApiKey}`,
      },
      body: cloudFormData,
    })

    if (!response.ok) {
      throw new Error(`CloudConvert API error: ${response.statusText}`)
    }

    const result = await response.blob()
    return new NextResponse(result, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    })
  } catch (error) {
    console.error("Conversion error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Conversion failed" }, { status: 500 })
  }
}

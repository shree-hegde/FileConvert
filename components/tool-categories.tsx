"use client"

const categories = [
  {
    name: "Image Converters",
    tools: ["JPG to PNG", "PNG to WebP", "JPG to WebP", "Image Resizer"],
  },
  {
    name: "PDF Tools",
    tools: ["Split PDF", "Rotate PDF", "PDF Watermark", "PDF to Word"],
  },
  {
    name: "Format Converters",
    tools: ["PDF to Excel", "PDF to PPT", "DOCX to PDF", "Excel to PDF"],
  },
  {
    name: "File Tools",
    tools: ["File Size Reducer", "Video Converter", "Audio Converter", "Batch Convert"],
  },
]

export function ToolCategories() {
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Browse All Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              <ul className="space-y-2">
                {category.tools.map((tool) => (
                  <li key={tool}>
                    <a href="#" className="text-primary hover:underline text-sm">
                      {tool}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

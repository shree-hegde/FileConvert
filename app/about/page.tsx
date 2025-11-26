import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-4xl font-bold mb-6">About FileConvert</h1>

        <div className="space-y-6 text-muted-foreground">
          <p className="text-lg">
            FileConvert is your all-in-one solution for fast, secure, and free file conversions. We believe file
            conversion should be simple, fast, and most importantly, private.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
            <p>
              To provide the fastest, most reliable, and privacy-first file conversion platform. We built FileConvert
              because we were tired of slow, ad-filled conversion websites that compromise your privacy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Why FileConvert?</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>100% Free - No hidden fees or premium walls</li>
              <li>Offline - Most conversions work completely offline</li>
              <li>Secure - Your files never leave your device</li>
              <li>Fast - Optimized algorithms for speed</li>
              <li>No Ads - Clean, distraction-free interface</li>
              <li>50+ Formats - Support for all major file types</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Technology</h2>
            <p>
              Built with modern web technologies including React, Next.js, and WebAssembly for maximum performance. We
              use industry-standard libraries like PDF-lib, Sharp, and browser compression APIs.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

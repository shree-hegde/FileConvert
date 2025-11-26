import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-muted-foreground">
          <p>Last updated: January 2025</p>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Privacy at FileConvert</h2>
            <p>
              Your privacy is our top priority. FileConvert operates with a privacy-first approach. Most conversions
              happen entirely on your device, and we never store your files.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Data We Collect</h2>
            <p>
              We collect minimal data: anonymous usage statistics and error logs to improve the service. We do NOT
              collect personal information, track conversions, or store files.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Offline Conversions</h2>
            <p>
              Image and PDF conversions happen 100% offline. Your files never leave your device. Files are processed in
              your browser's memory and deleted after conversion.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Cloud Processing</h2>
            <p>
              Some advanced conversions (like PDF to Word) use secure cloud processing. Files are encrypted in transit,
              processed, and immediately deleted. We never retain copies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact</h2>
            <p>Questions about privacy? Contact us at privacy@fileconvert.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

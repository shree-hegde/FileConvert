import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <div className="space-y-6 text-muted-foreground">
          <p>Last updated: January 2025</p>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Agreement to Terms</h2>
            <p>
              By using FileConvert, you agree to comply with these terms and all applicable laws and regulations. If you
              do not agree with any part of these terms, you may not use the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on
              FileConvert for personal, non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer the materials</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Disclaimer</h2>
            <p>
              The materials on FileConvert are provided on an 'as is' basis. FileConvert makes no warranties, expressed
              or implied, and hereby disclaims and negates all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Limitations</h2>
            <p>
              In no event shall FileConvert or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on FileConvert.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">FileConvert</h3>
            <p className="text-sm text-muted-foreground">Fast, free, and secure file conversion tools for everyone.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/image-to-pdf" className="hover:text-primary">
                  Image to PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-image" className="hover:text-primary">
                  PDF to Image
                </Link>
              </li>
              <li>
                <Link href="/tools/merge-pdf" className="hover:text-primary">
                  Merge PDF
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex gap-3 text-xl">
              <a href="mailto:hello@fileconvert.com" className="hover:text-primary">
                ✉️
              </a>
              <a href="#" className="hover:text-primary">
                🐙
              </a>
              <a href="#" className="hover:text-primary">
                𝕏
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2025 FileConvert. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>

      {/* AdSense placeholder */}
      <div className="bg-muted p-4 text-center text-xs text-muted-foreground">
        {/* Google AdSense placement - replace with real ad unit */}
        <div className="border border-dashed border-border rounded p-2">Ad Space</div>
      </div>
    </footer>
  )
}

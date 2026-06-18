import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Everest Himalaya Resort | Luxury Nepali Hospitality",
  description:
    "Experience authentic Nepali hospitality at Everest Himalaya Resort — premium suites with panoramic mountain views, Ayurvedic spa, Himalayan trekking, cultural tours, and exquisite local cuisine in the heart of Kathmandu.",
  keywords: [
    "Nepal luxury hotel",
    "Kathmandu resort",
    "Himalayan hotel",
    "mountain view hotel Nepal",
    "Nepali hospitality",
    "Everest view suite",
    "trekking Nepal",
    "Ayurvedic spa Nepal",
    "cultural tours Kathmandu",
    "airport pickup Nepal",
  ],
  authors: [{ name: "Everest Himalaya Resort" }],
  openGraph: {
    title: "Everest Himalaya Resort — Luxury Nepali Hospitality",
    description:
      "Stay at the foot of the Himalayas with world-class service, traditional welcome ceremonies, and breathtaking mountain vistas. Book now in NPR.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="bg-[#0d0b08] text-[#e8e0d0] font-sans antialiased min-h-screen flex flex-col">
        {/* Page content (nav + sections are in page.tsx) */}
        <main className="flex-grow">{children}</main>

        {/* ─── FOOTER ────────────────────────────────────────────────── */}
        <footer className="bg-[#080603] border-t border-yellow-800/20">
          {/* Top mountain silhouette decoration */}
          <div
            className="w-full h-12 bg-[#0d0b08] mountain-divider"
            style={{
              clipPath:
                "polygon(0% 100%, 4% 55%, 9% 80%, 16% 25%, 24% 65%, 33% 10%, 43% 52%, 53% 18%, 63% 58%, 72% 22%, 81% 52%, 89% 32%, 94% 62%, 100% 45%, 100% 100%)",
            }}
          />

          {/* Main footer columns */}
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

              {/* Brand column — wider */}
              <div className="lg:col-span-2 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-yellow-600/40 flex items-center justify-center shrink-0">
                    <span className="text-yellow-400 text-xs">✦</span>
                  </div>
                  <div>
                    <span className="font-serif text-lg tracking-widest text-yellow-100 uppercase font-light">
                      Everest{" "}
                      <span className="font-semibold text-yellow-400">Himalaya</span>
                    </span>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-yellow-700/70 font-light">
                      Resort · Kathmandu, Nepal
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#6a5a3a] font-light leading-relaxed">
                  Nestled among the world&apos;s highest peaks since 1962, we offer
                  an unparalleled fusion of authentic Nepali warmth and
                  world-class luxury — where every stay becomes a lifelong memory.
                </p>
                <p className="text-xs text-[#4a3a1a] font-light italic">
                  &ldquo;Atithi Devo Bhava&rdquo; — The guest is god.
                </p>

                {/* Social links */}
                <div className="flex gap-3 pt-2">
                  {[
                    {
                      href: "https://instagram.com",
                      label: "Instagram",
                      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.009 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.009-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.01-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                    },
                    {
                      href: "https://facebook.com",
                      label: "Facebook",
                      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                    },
                    {
                      href: "https://twitter.com",
                      label: "Twitter / X",
                      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.735-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-8 h-8 border border-yellow-800/30 flex items-center justify-center text-[#6a5a3a] hover:text-yellow-400 hover:border-yellow-600/50 transition-all duration-300"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Explore */}
              <div className="space-y-4">
                <h4 className="text-[9px] uppercase tracking-widest text-yellow-600 font-bold">Explore</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "Our Suites & Rooms", href: "#suites" },
                    { label: "Himalayan Experiences", href: "#experiences" },
                    { label: "Photo Gallery", href: "#gallery" },
                    { label: "Our Heritage", href: "#about" },
                    { label: "Book a Stay", href: "#booking-suite" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-[#6a5a3a] hover:text-yellow-300 transition-colors font-light flex items-center gap-2 group"
                      >
                        <span className="h-px w-3 bg-yellow-700/50 group-hover:w-5 group-hover:bg-yellow-500 transition-all duration-300" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experiences */}
              <div className="space-y-4">
                <h4 className="text-[9px] uppercase tracking-widest text-yellow-600 font-bold">Experiences</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "Ayurvedic Spa", href: "#experiences" },
                    { label: "Himalayan Trekking", href: "#experiences" },
                    { label: "Nepali Cuisine", href: "#experiences" },
                    { label: "Cultural Tours", href: "#experiences" },
                    { label: "Airport Transfer", href: "#booking-suite" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-[#6a5a3a] hover:text-yellow-300 transition-colors font-light flex items-center gap-2 group"
                      >
                        <span className="h-px w-3 bg-yellow-700/50 group-hover:w-5 group-hover:bg-yellow-500 transition-all duration-300" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Newsletter */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-[9px] uppercase tracking-widest text-yellow-600 font-bold">Contact</h4>
                  <ul className="space-y-2 text-xs text-[#6a5a3a] font-light">
                    <li>
                      <a href="tel:+97714421234" className="hover:text-yellow-300 transition-colors">
                        T: +977-1-442-1234
                      </a>
                    </li>
                    <li>
                      <a href="mailto:reservations@everesthimalaya.com" className="hover:text-yellow-300 transition-colors">
                        reservations@everesthimalaya.com
                      </a>
                    </li>
                    <li className="leading-relaxed">
                      Thamel, Kathmandu 44600,<br />
                      Nepal 🇳🇵
                    </li>
                  </ul>
                </div>

                {/* Newsletter */}
                <div className="space-y-3">
                  <h4 className="text-[9px] uppercase tracking-widest text-yellow-600 font-bold">Newsletter</h4>
                  <p className="text-xs text-[#4a3a1a] font-light leading-relaxed">
                    Private invitations & exclusive seasonal offers.
                  </p>
                  <form action="#" method="get" className="flex gap-0">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-grow bg-[#13100a] border border-yellow-800/20 border-r-0 px-3 py-2 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-600/40"
                    />
                    <button
                      type="submit"
                      className="bg-yellow-600 hover:bg-yellow-500 text-[#0d0b08] font-bold text-xs uppercase tracking-wider px-4 py-2 transition-colors duration-300 shrink-0"
                    >
                      Join
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Divider with decorative element */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-grow bg-yellow-800/15" />
              <span className="text-yellow-700/40 text-xs">✦</span>
              <div className="h-px flex-grow bg-yellow-800/15" />
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#4a3a1a] font-light">
              <p>
                &copy; {new Date().getFullYear()} Everest Himalaya Resort Pvt. Ltd. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Sitemap"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <p>
                Reg. No: 123456-Nepal · TAAN Certified
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

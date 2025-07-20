import "./globals.css";

import GoogleAnalytics from "@/components/GoogleAnalytics";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Lukáš Řiháček | Psycholog",
  description: "Psycholog Olomouc",
};

function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div
      className="fixed bottom-1 left-1 z-50
    flex size-6 items-center justify-center
    rounded-full ☐ bg-gray-800 p-3 font-mono
    text-xs text-white"
    >
      <div className="block sm:hidden">xs</div>
      <div
        className="hidden sm:block
    md:hidden"
      >
        sm
      </div>
      <div
        className="hidden md:block
    lg:hidden"
      >
        md
      </div>
      <div
        className="hidden lg:block
    xl:hidden"
      >
        lg
      </div>
      <div
        className="hidden xl:block
    2xl:hidden"
      >
        xl
      </div>
      <div className="hidden 2xl:block">2x1</div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="cs-CZ" className="scroll-smooth">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-BN98QTWG3M" />

      <body
        className={`${poppins.className} antialiased mx-auto md:container text-black bg-white `}
      >
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
}

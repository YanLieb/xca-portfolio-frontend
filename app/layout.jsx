import "./globals.css";
import { GeistSans } from "geist/font/sans";

import Header from "@/app/layouts/header/header";
import Footer from "@/app/layouts/footer";
import LoadingOverlay from '@/app/layouts/LoadingOverlay/LoadingOverlay'

export const metadata = {
  title: "Xca Portfolio",
  description: "Design Portfolio of Xcaret Castillo Sanchez",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${GeistSans.variable} font-light`}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="https://use.typekit.net/khg4nue.css" />
      </head>

      <body>
        <div className="page-content">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

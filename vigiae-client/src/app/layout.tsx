import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vigiaê",
  description:
    "Plataforma para acompanhamento de inspeções de vigilância sanitária.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="light" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}

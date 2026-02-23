import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import "./globals.css"

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
      <Toaster position="top-center" />
    </html>
  )
}

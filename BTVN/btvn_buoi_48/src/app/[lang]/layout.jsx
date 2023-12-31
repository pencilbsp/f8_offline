import { Inter } from "next/font/google"
import "../globals.css"

import Header from "@/components/Header"
import ThemeProvider from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Pencil Portfolio",
  description: "Generated by create next app",
}

export default function RootLayout({ children, params: { lang } }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Header lang={lang} />
          <main className="container mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
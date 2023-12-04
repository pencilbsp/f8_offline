"use client"

import { useRouter } from "next/navigation"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function ThemeProvider({ children }) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class">{children}</NextThemesProvider>
    </NextUIProvider>
  )
}

"use client"
import { useTheme } from "next-themes"
import { Switch } from "@nextui-org/react"

import { SunIcon, MoonIcon } from "./icons"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Switch
      endContent={<MoonIcon />}
      startContent={<SunIcon />}
      checked={theme === "light"}
      onChange={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  )
}

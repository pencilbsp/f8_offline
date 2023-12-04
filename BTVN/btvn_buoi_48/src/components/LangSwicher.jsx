"use client"

import { Tabs, Tab } from "@nextui-org/react"
import { useRouter, usePathname } from "next/navigation"

export default function LangSwicher({ lang }) {
  const { push } = useRouter()
  const pathname = usePathname()

  const handleChangeLocale = (locale) => {
    if (locale !== lang) push(pathname.replace(lang, locale))
  }

  return (
    <Tabs selectedKey={lang} size="sm" aria-label="Lang swicher" onSelectionChange={handleChangeLocale}>
      <Tab key="vi" title="Tiếng Việt" />
      <Tab key="en" title="Tiếng Anh" />
    </Tabs>
  )
}

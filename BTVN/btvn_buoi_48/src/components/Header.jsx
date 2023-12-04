import LangSwicher from "./LangSwicher"
import ThemeSwitcher from "./ThemeSwitcher"

export default function Header({ lang }) {
  return (
    <header className="h-[56px]">
      <div className="h-full container flex items-center justify-between">
        <ThemeSwitcher />
        <LangSwicher lang={lang} />
      </div>
    </header>
  )
}

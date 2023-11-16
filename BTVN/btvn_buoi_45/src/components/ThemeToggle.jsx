import { Select } from "@radix-ui/themes";

import { useTheme } from "../context/Theme";

export default function ThemeToggle() {
  const { theme, themes, setTheme } = useTheme();

  return (
    <Select.Root defaultValue={theme} onValueChange={setTheme}>
      <Select.Trigger className="capitalize cursor-pointer" radius="large" />
      <Select.Content position="popper">
        {themes.map((theme) => (
          <Select.Item key={theme} value={theme} className="capitalize">
            {theme}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

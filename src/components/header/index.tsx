import { useTheme } from "next-themes";

function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle
    </div>
  );
}

export default Header;

import { useTheme } from "next-themes";
import Link from "next/link";

function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            Next-log
          </Link>
          <nav className="flex gap-6 items-center font-medium text-sm">
            <a hclassName=""></a>
          </nav>
        </div>
        <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Toggle
        </div>
      </div>
    </header>
  );
}

export default Header;

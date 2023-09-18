import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "~lib/utils";

function Header() {
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  console.log(router.pathname, router.asPath);

  const isActive = true;
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            Next-log
          </Link>
          <nav className="flex gap-6 items-center font-medium text-sm">
            <Link
              href="/article"
              className={cn(
                "transition-colors hover:text-foreground/80 text-foreground/60",
                isActive && "text-foreground"
              )}
            >
              Article
            </Link>
            <Link
              href="/resume"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Resume
            </Link>
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

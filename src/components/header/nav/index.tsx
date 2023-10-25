import Link from "next/link";
import useIsRouteActive from "~hooks/useIsActive";
import { cn } from "~lib/utils";
import NavSheet from "../navSheet";

function PageNav() {
  const isArticleActive = useIsRouteActive("/article");
  const isResumeActive = useIsRouteActive("/resume");

  return (
    <div className="md:flex">
      <Link href="/" className="hidden md:flex mr-6 items-center space-x-2">
        {/* ADD a logo
        <svg width={24} height={24} /> or <img src={"your_link"} alt="logo"/>
      */}
        <span className="font-bold sm:inline-block">Next-log</span>
      </Link>
      <nav className="hidden md:flex gap-6 items-center font-medium text-sm">
        <Link
          href="/article"
          className={cn(
            "transition-colors hover:text-foreground/80 text-foreground/60",
            isArticleActive && "text-foreground"
          )}
        >
          Article
        </Link>
        <Link
          href="/resume"
          className={cn(
            "transition-colors hover:text-foreground/80 text-foreground/60",
            isResumeActive && "text-foreground"
          )}
        >
          Resume
        </Link>
      </nav>
      <NavSheet />
    </div>
  );
}

export default PageNav;

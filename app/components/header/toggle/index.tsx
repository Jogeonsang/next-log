import { useTheme } from "next-themes";
import Link from "next/link";
import dynamic from "next/dynamic";

import GithubIcon from "~components/icon/githubIcon";
import LinkdeInIcon from "~components/icon/linkdeInIcon";
import MoonIcon from "~components/icon/moonIcon";
import SunIcon from "~components/icon/sunIcon";

import { Button } from "~components/ui/button";
import LoadingCircle from "~components/ui/loadingCircle";

const LanguageSwitcher = dynamic(() => import("./LangController"), {
  ssr: false,
  loading: () => <LoadingCircle />,
});

function NavToggles() {
  const { theme = "dark", setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <nav className="flex items-center">
      <Link href={"https://github.com/Jogeonsang"} target="_blank" passHref>
        <Button variant="ghost" className="w-9 shrink-0 px-0">
          <GithubIcon className="h-4 w-4" />
        </Button>
      </Link>
      <Link
        href={"https://www.linkedin.com/in/geonsan-jo-5a570612b/"}
        target="_blank"
        passHref
      >
        <Button variant="ghost" className="w-9 shrink-0 px-0">
          <LinkdeInIcon className="h-4 w-4" />
        </Button>
      </Link>
      <LanguageSwitcher />
      <Button
        variant="ghost"
        className="w-9 shrink-0 px-0"
        onClick={changeTheme}
      >
        {theme === "dark" ? (
          <MoonIcon className="h-4 w-4" />
        ) : (
          <SunIcon className="h-4 w-4" />
        )}
      </Button>
    </nav>
  );
}

export default NavToggles;

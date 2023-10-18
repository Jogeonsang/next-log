import Link from "next/link";
import useIsRouteActive from "~hooks/useIsActive";
import { cn } from "~lib/utils";
import DesktopNav from "./desktopNav";

function PageNav() {
  const isArticleActive = useIsRouteActive("/article");
  const isResumeActive = useIsRouteActive("/resume");

  return (
    <div className="md:flex">
      <DesktopNav />
    </div>
  );
}

export default PageNav;

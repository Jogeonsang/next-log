import { ReactElement, ReactNode, createElement } from "react";
import { MDXProvider } from "@mdx-js/react";
import Image, { type ImageProps } from "next/image";
import type { Components } from "@mdx-js/react/lib";

const DEFAULT_COMPONENTS = {
  img: (props) =>
    createElement(
      typeof props.src === "object" ? Image : "img",
      props as ImageProps
    ),
} satisfies Components;

const useComponents = (): Components => {
  return {};
};

export const MDXTheme = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return (
    <MDXProvider components={useComponents()} disableParentContext={false}>
      {children}
    </MDXProvider>
  );
};

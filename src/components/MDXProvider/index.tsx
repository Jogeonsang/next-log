import { createElement } from "react";
import type { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import Image, { type ImageProps } from "next/image";
import type { Components } from "@mdx-js/react/lib";

type Props = {
  children: ReactNode | null | undefined;
};

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

export const MDXTheme = ({ children }: Props) => {
  return <MDXProvider components={useComponents()}>{children}</MDXProvider>;
};

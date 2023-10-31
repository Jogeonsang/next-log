// @ts-ignore
import rehypeAddClasses from "rehype-add-classes";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import { unified } from "unified";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAddClasses, { "h1,h2": "heading" })
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypePrettyCode, { theme: "one-dark-pro" })
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferer"],
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}

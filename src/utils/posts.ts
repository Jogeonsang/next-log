import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => {
    const stat = fs.statSync(path.join(postsDirectory, file));
    return stat.isDirectory();
  });
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  let fullPath;

  if (fs.existsSync(path.join(postsDirectory, realSlug, "index.mdx"))) {
    fullPath = path.join(postsDirectory, realSlug, "index.mdx");
  } else {
    fullPath = path.join(postsDirectory, realSlug, "index.md");
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (data.date instanceof Date) {
    data.date = data.date.toISOString();
  }

  return { slug: realSlug, metadata: data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  return posts;
}

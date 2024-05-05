import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostMetadata } from "~types/post";

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

  return { slug: realSlug, metadata: data as PostMetadata, content };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts: Post[] = slugs.map((slug) => getPostBySlug(slug));

  posts.sort((post1, post2) => {
    const date1 = new Date(post1.metadata.date);
    const date2 = new Date(post2.metadata.date);

    return date2.getTime() - date1.getTime();
  });

  return posts;
}
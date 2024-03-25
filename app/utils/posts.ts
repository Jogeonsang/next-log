import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostMetadata } from "../types/post";

const postsDirectory = path.join(process.cwd(), "app/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => {
    const fullPath = path.join(postsDirectory, file);
    const stat = fs.statSync(fullPath);
    // '[slug]' 디렉토리는 제외하고 실제 게시물 디렉토리만 반환
    return stat.isDirectory() && file !== "[slug]";
  });
}
export function getPostBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);

  const realSlug = decodedSlug.replace(/\.mdx?$/, "");
  const slugDirectoryPath = path.join(postsDirectory, realSlug);

  // 'index.mdx' 또는 'index.md' 파일을 찾습니다.
  const fullPath = fs.existsSync(path.join(slugDirectoryPath, "index.mdx"))
    ? path.join(slugDirectoryPath, "index.mdx")
    : path.join(slugDirectoryPath, "index.md");

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

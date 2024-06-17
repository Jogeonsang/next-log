import Image from "next/image";
import { cookies } from "next/headers";
import dayjs from "dayjs";

import { getPostBySlug, getAllPosts } from "~utils/posts";
import markdownToHtml from "~core/blog/markdownToHtml";

import { Post } from "../../../types/post";
import i18nConfig from "../../../next-i18next.config";

const getPost = async (
  slug: string | undefined,
  lang: string
): Promise<Post> => {
  if (!slug || typeof slug !== "string") {
    throw new Response("Not Found", { status: 404 });
  }

  const post: Post = getPostBySlug(slug, lang);
  const mdxSource = await markdownToHtml(post.content);

  return {
    ...{ ...post, content: mdxSource },
  };
};

const PostPage: React.FC = async ({ params }: any) => {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || i18nConfig.defaultLocale;
  const post = await getPost(params.slug, lang);

  const fomattedDate = (date: string) => {
    const formattedDateKr = dayjs(date).format("YYYY년 MM월 DD일");
    const formattedDateEn = dayjs(date).format("MMMM DD, YYYY");

    return lang === "kr" ? formattedDateKr : formattedDateEn;
  };

  return (
    <article className="prose dark:prose-invert max-w-none prose-pre:rounded-[9px] my-16">
      <div className="max-w-[1000px] m-auto text-center">
        <h1>{post.metadata.title}</h1>
        {post.metadata.thumbnail && (
          <Image
            src={`/posts/${post.slug}/${post.metadata.thumbnail}`}
            alt="post_thumbnail"
            className="rounded-[14px]"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={0}
            height={0}
          />
        )}
        <p>
          {post.metadata.category} | {fomattedDate(post.metadata.date)}
        </p>
      </div>
      <div className="max-w-[800px] m-auto">
        <div className="flex-col my-12">
          <h3 dangerouslySetInnerHTML={{ __html: post.metadata.introTitle }} />
          <span dangerouslySetInnerHTML={{ __html: post.metadata.introDesc }} />
        </div>
        <hr className="border-1 w-4/12 m-auto mb-20" />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
};

export default PostPage;

export const generateStaticParams = async () => {
  const posts = getAllPosts();
  return posts.map((post) => ({ params: { slug: post.slug } }));
};

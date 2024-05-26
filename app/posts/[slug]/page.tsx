import { getPostBySlug, getAllPosts } from "~utils/posts";
import markdownToHtml from "~core/blog/markdownToHtml";
import { Post } from "../../../types/post";
import Image from "next/image";

const getPost = async (slug: string | undefined): Promise<Post> => {
  if (!slug || typeof slug !== "string") {
    throw new Response("Not Found", { status: 404 });
  }

  const post: Post = getPostBySlug(slug); // 가정: 이 함수는 Post 타입의 객체를 반환
  const mdxSource = await markdownToHtml(post.content);

  return {
    ...{ ...post, content: mdxSource },
  };
};

const PostPage: React.FC = async ({ params }: any) => {
  const post = await getPost(params.slug);

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
          {post.metadata.category} | {post.metadata.date}
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

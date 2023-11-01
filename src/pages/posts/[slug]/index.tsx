import { getPostBySlug, getAllPosts } from "~utils/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import markdownToHtml from "~core/blog/markdownToHtml";
import { MDXTheme } from "~components/MDXProvider";

type PostPageProps = {
  post: {
    metadata: any;
    content: string;
  };
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <article className="prose dark:prose-invert max-w-none prose-pre:rounded-[9px]">
      <h1>{post.metadata.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== "string") {
    return {
      notFound: true,
    };
  }

  const post = getPostBySlug(params.slug);

  const mdxSource = await markdownToHtml(post.content);
  console.log(mdxSource);

  return {
    props: {
      post: {
        ...post,
        content: mdxSource,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

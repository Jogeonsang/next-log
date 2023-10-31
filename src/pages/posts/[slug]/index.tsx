import { getPostBySlug, getAllPosts } from "~utils/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import markdownToHtml from "~core/blog/markdownToHtml";

type PostPageProps = {
  post: {
    metadata: any;
    content: MDXRemoteSerializeResult;
  };
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <div className="prose dark:prose-invert">
      <h1>{post.metadata.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
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

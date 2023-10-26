import { getPostBySlug, getAllPosts } from "~utils/posts";
import { Post } from "~types/post";
import { GetStaticPaths, GetStaticProps } from "next";

type PostPageProps = {
  post: Post;
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.metadata.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
  return {
    props: {
      post,
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

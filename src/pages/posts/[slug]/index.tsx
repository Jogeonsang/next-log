import { getPostBySlug, getAllPosts } from "~utils/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import markdownToHtml from "~core/blog/markdownToHtml";

type PostPageProps = {
  post: {
    metadata: any;
    content: string;
    slug: string;
  };
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <article className="prose dark:prose-invert max-w-none prose-pre:rounded-[9px] my-16">
      <div className="max-w-[1000px] m-auto text-center">
        <h1 className="">{post.metadata.title}</h1>
        <img
          src={`/posts/${post.slug}/${post.metadata.thumbnail}`}
          alt="Thumbnail"
          className="rounded-[14px]"
        />
        <p>
          {post.metadata.category} | {post.metadata.date}
        </p>
      </div>
      <div className="max-w-[800px] m-auto">
        <div className="flex-col my-12">
          <h3 className="">{post.metadata.introTitle}</h3>
          <span className="">{post.metadata.introDesc}</span>
        </div>
        <hr className="border-1 w-4/12 m-auto mb-20" />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
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

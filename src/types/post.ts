export type PostMetadata = {
  slug: string;
  metadata: {
    title: string;
    date: string;
    thumbnail?: string;
    description: string;
    author: string;
  };
  content: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

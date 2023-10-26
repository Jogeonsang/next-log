export type PostMetadata = {
  title: string;
  date: string;
  slug: string;
  [key: string]: any;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

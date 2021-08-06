enum PostType {
  IMAGE = "image",
  YOUTUBE = "youtube",
  NOTICE = "notice",
}

export type Post = {
  id: number;
  ownerId: number;
  categoryId: number;
  content: string;
  type: PostType;
  createTime: number;
  updateTime: number;
  replies: PostReply[];
};

export type PostReply = {
  id: number;
  postId: number;
  reReplyId: number;
  ownerId: number;
  content: string;
  createTime: number;
  updateTime: number;
};

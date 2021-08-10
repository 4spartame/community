export enum UserLevel {
  MEMBER,
  STAFF,
  ADMIN,
}

export type User = {
  id: number;
  userId: string;
  name: string;
  password: string;
  age: string;
  joinDate: number;
  level: UserLevel;
};

export enum PostType {
  IMAGE = "image",
  YOUTUBE = "youtube",
  NOTICE = "notice",
}

export type Post = {
  id: number;
  ownerId: number;
  categoryId: number;
  contents: string;
  type: PostType;
  createTime: number;
  updateTime: number;
  comments: PostComment[];
};

export type PostComment = {
  id: number;
  postId: number;
  replyId: number;
  categoryId: number;
  ownerId: number;
  contents: string;
  createTime: number;
  updateTime: number;
};

export interface Reply {
  id: number;
  description: string;
  userReply: { id: number; user: { id: number; nickname: string } }[];
  createdAt: string;
  user: { nickname: string };
}

export interface Comments {
  id: number;
  description: string;
  createdAt: string;
  userComment: { id: number; user: { id: number; nickname: string } }[];
  reply: Reply[];
  user: { nickname: string };
}

export interface UserLike {
  id: number;
  user: {
    nickname: string;
  };
}

export interface IdeaList {
  id: number;
  createdAt: string;
  title: string;
  user: { id: number; username: string };
  tags: { id: number; title: string }[];
  description: string;
  postingLikesCount: number;
  postingLikes: {
    id: number;
  }[];
  commentCount: number;
  seen: number;
  postingImage: {
    id: number;
    title: string;
    url: string;
  }[];
  views: number;
  category: { name: string };
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface IdeaInfo {
  title: string;
  category: string;
  description: string;
  tag: string[];
}

export interface File {
  name: string;
  lastModified: number;
  lastModifiedDate: object;
  size: number;
  type: string;
}

export interface SignUpInfo {
  email: string;
  password: string;
  username: string;
  nickname: string;
}

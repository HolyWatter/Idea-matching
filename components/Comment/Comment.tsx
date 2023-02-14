import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { API } from "../../config";
import { userNickName } from "../State/Atom";
import ReplyComponent from "./ReplyComponent";
import { Comments } from "../State/interface";
import { useMutation, useQueryClient } from "react-query";
import { likeApi, postReply } from "../State/ApiFunction";

interface Props {
  comment: Comments;
}

//댓글 수정 comments/update/:commnetid
//대댓글 수정 replies/update/:replyid
//대댓글 삭제 replies/delete/:replyid

interface UserLike {
  id: number;
  user: { id: number; nickname: string };
}

export default function Comment({ comment }: Props) {
  const nickname = useRecoilValue(userNickName);
  const [currentUserLike, setCurrentUserLike] = useState<UserLike[]>();
  const [replyText, setReplyText] = useState<string>("");
  useEffect(() => {
    setCurrentUserLike(
      comment.userComment.filter((item) => item.user.nickname === nickname)
    );
  }, []);
  const queryClient = useQueryClient();
  const postReplyMutation = useMutation(
    () => postReply(comment.id, replyText),
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  const submitReply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postReplyMutation.mutate();
  };

  const date = new Date(comment.createdAt);
  const timeFormat = new Intl.DateTimeFormat("KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

  const inputReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };

  const likeCommentMutation = useMutation(() => likeApi(comment.id), {
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const clickLike = () => {
    likeCommentMutation.mutate;
  };

  console.log(comment)

  return (
    <div className="space-y-4 py-3">
      <div className="flex justify-between">
        <div className="flex flex-col items-start justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <p className="text-lg">{comment.user.nickname}</p>
            <p className="text-xs text-gray-500">{timeFormat}</p>
          </div>
          <p>{comment.description}</p>
        </div>
        <div className="flex flex-col">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button onClick={clickLike}>
            <svg
              className="h-5 w-5"
              fill={currentUserLike?.length === 1 ? "#EA5856" : "none"}
              stroke="#EA5856"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <form onSubmit={submitReply} className="flex w-full justify-between">
        <input
          placeholder=" 댓글을 입력하세요"
          className="w-[90%] border-b bg-bg focus:outline-none"
          onChange={inputReply}
          value={replyText}
        />
        <button>입력</button>
      </form>
      <div className="space-y-4 pl-10">
        {comment.reply.map((reply) => (
          <ReplyComponent key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
}

// const COMMENT = {
//   createReply: axios.post(`${API.basic}/replies/create`, {
//     headers: { Authorization: localStorage.getItem("token") },
//     body: {},
//   }),
//   deleteComment: axios.delete(`${API.basic}/comments/delete/${e.currentTarget.value}`, {
//     headers: { Authorization: localStorage.getItem("token") },
//   }),
//   likeComment: axios.post(`${API.basic}/comments/like/${e.currentTarget.value}`, {
//     headers: { Authorization: localStorage.getItem("token") },
//     body: {},
//   }),
//   likeReply: axios.post(`${API.basic}/replies/like/${e.currentTarget.value}`, {
//     headers: { Authorization: localStorage.getItem("token") },
//   }),
// };

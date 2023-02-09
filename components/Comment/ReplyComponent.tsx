import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { API } from "../../config";
import { userNickName } from "../State/Atom";
import { Reply, UserLike } from "../State/interface";

interface Props {
  reply: Reply;
}

export default function ReplyComponent({ reply }: Props) {
  const nickname = useRecoilValue(userNickName);
  const [currentUserLike, setCurrentUserLike] = useState<UserLike[]>([]);
  useEffect(() => {
    setCurrentUserLike(
      reply.userReply.filter((item) => item.user.nickname === "박성수")
    );
  }, []);

  const date = new Date(reply.createdAt);
  const timeFormat = new Intl.DateTimeFormat("KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

  console.log(reply);
  const likeReply = () => {
    axios.post(
      `${API.basic}/replies/like/${reply.id}`,
      {},
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-center space-x-3">
          <p>{reply.user.nickname}</p>
          <p className="text-xs text-gray-500">{timeFormat}</p>
        </div>
        <p>{reply.description}</p>
      </div>
      <button onClick={likeReply}>
        <svg
          className="h-5 w-5"
          fill={currentUserLike.length === 1 ? "#EA5856" : "none"}
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
  );
}

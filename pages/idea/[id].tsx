import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  userId: number;
  userNickname: string;
}

interface Attach {
  hasAttach: boolean;
  fileUrl: string[];
}

interface Comments {
  user: User;
  text: string;
  commentLike: number;
}

interface Idea {
  id: number;
  title: string;
  text: string;
  user: User;
  attachments: Attach;
  tags: string[];
  countLike: number;
  comments: Comments;
  isLike: boolean;
  writeDate: string;
}

export default function Idea() {
  const [idea, setIdea] = useState<Idea | null>(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios({ url: "/data/IDEA_DETAIL.json" });
    setIdea(data.data[0]);
  };
  console.log(idea);
  return (
    <div>
      {idea && (
        <div>
          <div>
            <p className="">{idea.title}</p>
            <p>{idea.user.userNickname}</p>
            <p>{idea.writeDate}</p>
          </div>
          <div className="py-10">
            <p>{idea.text}</p>
          </div>
          <div>
            <button className="py-2 px-3 border rounded-md bg-gray-500 text-white">1:1 채팅하기</button>
          </div>
          <form className="flex flex-col space-y-3 my-5">
            <textarea
              className="w-[400px] h-20 p-3 border rounded-sm resize-none focus:outline-origin"
              placeholder="댓글을 입력하세요"
            />
            <button className="w-[100px] h-10 border bg-origin rounded-md text-white">
              등록하기
            </button>
          </form>
          <div>
            <div className="py-3 border-b">
              <p>유저이름</p>
              <p>텍스트 어쩌고 저쩌고 블라블라 블라블라</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

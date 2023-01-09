import axios from "axios";
import { useEffect, useState } from "react";
import Idea from "../../components/IdeaComponent/Idea";

interface User {
  userId: number;
  userNickname: string;
}

interface Tags {
  id :number;
  tag : string;
}

interface IdeaList {
  id: number;
  title: string;
  user: User;
  tags: Tags[];
  countLike: number;
  countComments: number;
  isLike: boolean;
  seen: number;
}

export default function IdeaList() {
  const [ideaList, setIdeaList] = useState<IdeaList[] | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios({
      url: "/data/IDEA_LIST.json",
    });
    setIdeaList(data.data);
  };

  return (
    <div className="flex justify-center items-start space-x-20">
      <div className="space-y-10">
        <div className="w-[160px]">
          <p>카테고리</p>
          <div className="text-sm pt-3 space-y-1">
            <p>개발</p>
            <p>요리</p>
            <p>일상</p>
          </div>
        </div>
        <div className="border-t"/>
        <div className="w-[160px]">
          <p>인기태그</p>
          <div className="text-sm pt-3 space-y-1">
            <p># 일상</p>
            <p># 감성</p>
          </div>
        </div>
      </div>
      <div className="w-[840px]">
        <p>아이디어 목록</p>
        <div>
          {ideaList &&
            ideaList.map((idea) => <Idea key={idea.id} idea={idea} />)}
        </div>
      </div>
    </div>
  );
}

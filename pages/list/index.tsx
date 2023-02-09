import axios from "axios";
import { useEffect, useState } from "react";
import Idea from "../../components/IdeaComponent/Idea";

interface Tags {
  id :number;
  title : string;
}

interface Img{
  id : number ;
  title : string;
}

interface User{
  id : number ;
  username : string;
}

interface IdeaList {
  id: number;
  title: string;
  user: User;
  tags: Tags[];
  description : string;
  postingLikesCount: number;
  countComments: number;
  isLike: boolean;
  seen: number;
  postingImage :  Img[];
  views : number;
}

export default function IdeaList() {
  const [ideaList, setIdeaList] = useState<IdeaList[] | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios({
      url: "http://10.58.52.205:3000/posting/all?orderBy=b",
    });
    setIdeaList(data.data)
  };

  console.log(ideaList)
  

  return (
    <div className="flex justify-center items-start space-x-20 pb-20">
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

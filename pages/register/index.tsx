import { useState } from "react";
import axios from "axios";
import IdeaComponent from "../../components/IdeaComponent/IdeaComponent";
import { API } from "../../config";

interface IdeaInfo {
  title: string;
  category: number;
  description: string;
  tag: string[];
}

export default function IdeaAdd() {
  const [ideaInfo, setIdeaInfo] = useState<IdeaInfo>({
    title: "",
    category: 1,
    description: "",
    tag: [],
  });

  async function clickPost() {
    try {
      const response = await axios.post(API.create, ideaInfo, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch {}
  }

  return (
    <IdeaComponent
      asideText="아이디어를 공유해보세요"
      asideContentArr={ASIDE_CONTENT_ARR}
      mainText="아이디어 등록"
      setIdeaInfo={setIdeaInfo}
      ideaInfo={ideaInfo}
      onClick={clickPost}
    />
  );
}

const ASIDE_CONTENT_ARR = [
  { text: "아주 사소한 아이디어라도 좋아요", id: 0 },
  { text: "아이디어를 공유하면 구현해 줄 수 있는 사람이 모여요", id: 1 },
  { text: "직접 팀원을 모을 수 있어요", id: 2 },
  { text: "팀원을 모집하고 기획까지 참여해보세요", id: 3 },
];

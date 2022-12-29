import IdeaComponent from "../../components/IdeaComponent/IdeaComponent";

export default function IdeaAdd() {
  return (
    <IdeaComponent
      asideText="아이디어를 찾아보세요"
      asideContentArr={ASIDE_CONTENT_ARR}
      mainText="아이디어 찾기"
    />
  );
}

const ASIDE_CONTENT_ARR = [
  { text: "아이디어가 필요할 땐 요청해 보세요", id: 0 },
  { text: "어떤 아이디어가 필요한지 구체적으로 적어주세요", id: 1 },
  { text: "아이디어가 넘치는 분들이 아이디어를 공유할 거예요", id: 2 },
  { text: "필요하다면 팀원도 모집해 보세요", id: 3 },
];

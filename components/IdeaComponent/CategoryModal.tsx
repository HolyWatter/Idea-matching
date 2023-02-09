import { Dispatch, SetStateAction } from "react";
import { IdeaInfo } from "../State/interface";
interface Props {
  setIsCategoryModal: Dispatch<SetStateAction<boolean>>;
  setIdeaInfo: React.Dispatch<React.SetStateAction<IdeaInfo>>;
  ideaInfo: IdeaInfo;
}

export default function CategoryModal({
  setIsCategoryModal,
  setIdeaInfo,
  ideaInfo,
}: Props) {
  const selectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIdeaInfo({
      ...ideaInfo,
      category: e.currentTarget.value,
    });
    setIsCategoryModal((prev) => !prev);
  };

  return (
    <div className="flex w-[180px] flex-col items-start justify-center rounded-md border bg-white px-2">
      {CATEGORY.map((item) => (
        <button
          key={item.id}
          value={item.categoryName}
          className="text-md flex h-10 items-center p-2 text-gray-700"
          onClick={selectCategory}
        >
          <p>{item.categoryName}</p>
        </button>
      ))}
    </div>
  );
}

const CATEGORY = [
  { id: 1, categoryName: "웹 개발" },
  { id: 2, categoryName: "앱 개발" },
];

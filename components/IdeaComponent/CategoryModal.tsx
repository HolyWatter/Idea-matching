import { Dispatch, SetStateAction } from "react";

interface Props {
  setIsCategoryModal: Dispatch<SetStateAction<boolean>>;
}

export default function CategoryModal({ setIsCategoryModal }: Props) {
  const selectCategory = () => {
    setIsCategoryModal((prev) => !prev);
  };

  return (
    <div className="flex-col w-[200px] items-start px-2 flex justify-center border rounded-md bg-white">
      {CATEGORY.map((item) => (
        <button
          key={item.id} 
          value={item.id}
          className="h-10 flex items-center p-2"
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

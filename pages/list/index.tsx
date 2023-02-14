import { useState } from "react";
import Category from "../../components/Category";
import Idea from "../../components/IdeaComponent/Idea";
import ListSortingModal from "../../components/ListSortingModal";
import { IdeaList } from "../../components/State/interface";
import { useQuery } from "react-query";
import { getIdeaList } from "../../components/State/ApiFunction";

export default function List() {
  const [ideaList, setIdeaList] = useState<IdeaList[] | null>(null);
  const [isSortingTab, setisSortingTab] = useState<boolean>(false);
  const [sortingValue, setSortingValue] = useState<{
    text: string;
    query: string;
  }>({
    text: "최신순",
    query: "created",
  });

  const {data, isFetched} = useQuery(
    ["list", sortingValue.query ], 
    () => getIdeaList(sortingValue.query),{
      refetchOnWindowFocus: false
    }
  );



  const clickSortingTab = () => {
    setisSortingTab((prev) => !prev);
  };

  return (
    <div className="flex items-start justify-center px-10 pb-20 sm-m:pl-3">
      <Category />
      <div className="w-[840px]">
        <p className="text-lg">아이디어 목록</p>
        <div className="relative flex flex-col items-end">
          <button
            className="w-[100px] rounded-md border bg-gray-500 px-5 py-2 text-white"
            onClick={clickSortingTab}
          >
            <p>{sortingValue.text}</p>
          </button>
          {isSortingTab && (
            <ListSortingModal
              sort={SORT}
              setSortingValue={setSortingValue}
              setisSortingTab={setisSortingTab}
            />
          )}
        </div>
        <div>
          {
            isFetched &&
            data?.data.map((idea: IdeaList) => (
              <Idea key={idea.id} idea={idea} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

const SORT = [
  { id: 0, text: "최신순", value: "created" },
  { id: 1, text: "좋아요순", value: "likes" },
  { id: 2, text: "조회순", value: "views" },
];

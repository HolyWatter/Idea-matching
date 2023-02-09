import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Category from "../../components/Category";
import Idea from "../../components/IdeaComponent/Idea";
import ListSortingModal from "../../components/ListSortingModal";
import { loginState } from "../../components/State/Atom";
import { API } from "../../config";
import { IdeaList } from "../../components/State/interface";

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
  const loginStatus = useRecoilValue(loginState);

  useEffect(() => {
    getData();
  }, [sortingValue.query]);

  const getData = async () => {
    if (loginState) {
      const data = await axios({
        url: `${API.basic}/posting/all?orderBy=${sortingValue.query}`,
        headers: { Authorization: localStorage.getItem("token") },
      });
      setIdeaList(data.data);
    } else {
      const data = await axios({
        url: `${API.basic}/posting/all?orderBy=${sortingValue.query}`,
      });
      setIdeaList(data.data);
    }
  };

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
          {ideaList &&
            ideaList?.map((idea) => <Idea key={idea.id} idea={idea} />)}
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

import { Dispatch, SetStateAction, useCallback, useState, useRef } from "react";
import { Input } from "../../components/BtnInput/Input";
import CategoryModal from "./CategoryModal";

interface File {
  name: string;
  lastModified: number;
  lastModifiedDate: object;
  size: number;
  type: string;
}

interface Files {
  File: File;
}

interface IdeaInfo {
  title: string;
  category: number;
  description: string;
  tag: string[];
}

interface Content {
  text: string;
  id: number;
}

interface Props {
  asideText: string;
  asideContentArr: Content[];
  mainText: string;
  onClick: () => void;
  setIdeaInfo: Dispatch<SetStateAction<IdeaInfo>>;
  ideaInfo: IdeaInfo;
}

export default function IdeaComponent({
  asideText,
  asideContentArr,
  mainText,
  onClick,
  setIdeaInfo,
  ideaInfo,
}: Props) {
  const [fileList, setFileList] = useState<Files[] | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isCategoryModal, setIsCategoryModal] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(Object.values(e.target.files as any));
    }
  };

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIdeaInfo({
      ...ideaInfo,
      [name]: value,
    });
  };

  const clickCategory = () => {
    setIsCategoryModal((prev) => !prev);
    console.log(isCategoryModal);
  };

  const inputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const submitTags = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIdeaInfo({
      ...ideaInfo,
       tag : [...ideaInfo.tag, tag]});
    setTag("");
    console.log(ideaInfo)
  };

  const clickDelect = (e: React.MouseEvent<HTMLButtonElement>) => {
      let newTagList = ideaInfo.tag.filter((item) => item !== e.currentTarget.value)
      console.log(newTagList)
      setIdeaInfo({
        ...ideaInfo,
        tag : newTagList
      })
      console.log(ideaInfo)
  };

  return (
    <div className="flex justify-center space-x-10">
      <div className="min-w-[400px] h-[380px] w-[400px] border shadow-lg rounded-md xl-m:hidden bg-white">
        <p className="font-semibold p-5">{asideText}</p>
        <div className="border-t" />
        <div className="flex flex-col items-center w-full mt-10 text-sm space-y-6">
          {asideContentArr.map((items) => (
            <p
              key={items.id}
              className="text-center w-[90%] py-2 border rounded-full"
            >
              {items.text}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-10 min-w-[700px]">
        <div className="flex flex-col w-[700px] pb-7 border shadow-lg rounded-md bg-white">
          <p className="font-semibold p-5">{mainText}</p>
          <div className="border-t" />
          <div className="p-5 flex items-center">
            <p className="w-[80px] text-center mr-10">제목</p>
            <Input
              onChange={handleInput}
              name="title"
              type="text"
              placeholder="아이디어 이름을 입력하세요."
              value={ideaInfo.title}
            />
          </div>
          <div className="p-5 flex items-center relative">
            <p className="w-[80px] text-center mr-10">카테고리</p>
            <button
              onClick={clickCategory}
              className="w-[200px] h-10 items-center px-2 flex justify-between border rounded-md shadow-md"
            >
              <p>{ideaInfo.category}</p>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isCategoryModal && (
              <div className="absolute top-[59px] left-[140px]">
                <CategoryModal setIsCategoryModal={setIsCategoryModal} />
              </div>
            )}
          </div>
          <div className="p-5 flex items-center">
            <p className="w-[80px] text-center mr-10">태그</p>
            <form onSubmit={submitTags}>
              <Input
                onChange={inputTag}
                name="tag"
                type="text"
                placeholder="태그를 입력하세요"
                value={tag}
              />
            </form>
          </div>
          <div className="w-full pl-[140px] space-x-2 flex flex-wrap">
            {ideaInfo.tag.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 px-2 py-1 bg-origin text-white rounded-full mb-2"
              >
                <p>{item}</p>
                <button value={item} onClick={clickDelect}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="p-5 flex items-center">
            <div className="flex">
              <label className="w-[80px] h-8 cursor-pointer text-gray-600 hover:border-origin hover:text-origin flex items-center justify-center border-2 border-gray-300 rounded-md mr-10">
                <div>업로드</div>
                <input
                  ref={inputRef}
                  onChange={uploadFiles}
                  accept="image/*"
                  className="hidden"
                  multiple={true}
                  type="file"
                />
              </label>
              <div className="flex items-center">
                {fileList && (
                  <div className="w-[380px] px-3 py-3 border rounded-md shadow-md">
                    {fileList?.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between items-center"
                      >
                        <p className="px-2">{item.name}</p>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-5 flex flex-col items-start space-y-4">
            <p className="w-[80px] text-center">내용</p>
            <textarea
              onChange={handleInput}
              value={ideaInfo.description}
              name="description"
              className="focus:outline-none focus:border-origin focus:border-2 w-full h-[200px] border rounded-md shadow-md resize-none p-3"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button className="w-32 py-3 border rounded-md bg-gray-500 text-white shadow-md">
            취소
          </button>
          <button
            className="w-32 py-3 border rounded-md bg-origin text-white shadow-md"
            onClick={onClick}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

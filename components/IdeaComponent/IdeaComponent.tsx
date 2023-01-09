import { useCallback, useState, useRef } from "react";
import { Input } from "../../components/BtnInput/Input";

interface File {
  name: string;
  lastModified: number;
  lastModifiedDate: object;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface Files {
  File: File;
}

interface IdeaInfo {
  title: string;
  category: string;
  content: string;
}

interface Content {
  text: string;
  id: number;
}

interface Props {
  asideText: string;
  asideContentArr: Content[];
  mainText: string;
}

export default function IdeaComponent({
  asideText,
  asideContentArr,
  mainText,
}: Props) {
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [fileList, setFileList] = useState<Files[] | null>();
  const [ideaInfo, setIdeaInfo] = useState<IdeaInfo>({
    title: "",
    category: "개발",
    content: "",
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectHasFile = useCallback(() => {
    setHasFile(true);
  }, []);
  const selectNoneHasFile = useCallback(() => {
    setHasFile(false);
  }, []);

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // console.log(e.target.files)
      setFileList(Object.values(e.target.files));
    }
  };

  console.log(fileList);

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
              onChange={() => {}}
              name="title"
              type="text"
              placeholder="아이디어 이름을 입력하세요."
              value={ideaInfo.title}
            />
          </div>
          <div className="p-5 flex items-center">
            <p className="w-[80px] text-center mr-10">카테고리</p>
            <button className="w-[200px] h-10 items-center px-2 flex justify-between border rounded-md">
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
          </div>
          <div className="p-5 flex items-center">
            <p className="w-[80px] text-center mr-10">첨부파일</p>
            <div className="space-x-4">
              <button
                onClick={selectHasFile}
                className={
                  hasFile
                    ? "w-[100px] h-9 border rounded-full shadow-sm bg-origin text-white"
                    : "w-[100px] h-9 border rounded-full shadow-sm"
                }
              >
                예
              </button>
              <button
                onClick={selectNoneHasFile}
                className={
                  hasFile
                    ? "w-[100px] h-9 border rounded-full shadow-sm"
                    : `w-[100px] h-9 border rounded-full shadow-sm bg-origin text-white`
                }
              >
                아니요
              </button>
            </div>
          </div>
          <div className="flex items-center">
            {hasFile && (
              <div className="pl-5">
                <label className="w-[80px] cursor-pointer text-gray-600 hover:border-origin hover:text-origin flex items-center justify-center border-2 border-gray-300 rounded-md mr-10">
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
              </div>
            )}
            {fileList && hasFile && (
              <div className="w-[380px] px-3 py-3 border rounded-md">
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
          <div className="p-5 flex flex-col items-start space-y-4">
            <p className="w-[80px] text-center">내용</p>
            <textarea className="focus:outline-none focus:border-origin focus:border-2 w-full h-[200px] border rounded-md shadow-md resize-none p-3" />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button className="w-32 py-3 border rounded-md bg-gray-500 text-white shadow-md">
            취소
          </button>
          <button className="w-32 py-3 border rounded-md bg-origin text-white shadow-md">
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

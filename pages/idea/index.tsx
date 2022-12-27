import { useCallback, useState } from "react";
import { Input } from "../../components/BtnInput/Input";

export default function Idea() {
  const [hasFile, setHasFile] = useState<boolean>(false);
  const selectHasFile = useCallback(() => {
    setHasFile(true);
  }, []);
  const selectNoneHasFile = useCallback(() => {
    setHasFile(false);
  }, []);

  return (
    <div className="flex justify-center space-x-10 mt-6">
      <div className="min-w-[400px] w-[400px] h-[400px] border shadow-lg rounded-md xl-m:hidden">
        <p className="font-semibold p-5">아이디어를 공유해보세요</p>
        <div className="border-t" />
        <div className="flex flex-col items-center w-full mt-10 text-sm space-y-6">
          <p className="text-center w-[90%] py-2 border rounded-full">
            아주 사소한 아이디어라도 좋아요
          </p>
          <p className="text-center w-[90%] py-2 border rounded-full">
            아이디어를 공유하면 구현해 줄 수 있는 사람이 모여요
          </p>
          <p className="text-center w-[90%] py-2 border rounded-full">ㅈ</p>
          <p className="text-center w-[90%] py-2 border rounded-full">
            직접 팀원을 모집하고 기획에도 참여할 수 있어요
          </p>
        </div>
      </div>
      <div className="space-y-10 min-w-[700px]">
        <div className="flex flex-col w-[700px] pb-7 border shadow-lg rounded-md">
          <p className="font-semibold p-5">아이디어 등록</p>
          <div className="border-t" />
          <div className="p-5 flex items-center">
            <p className="w-[80px]">제목</p>
            <Input />
          </div>
          <div className="p-5 flex items-center">
            <p className="w-[80px]">카테고리</p>
          </div>
          <div className="p-5 flex items-center">
            <p className="w-[80px]">첨부파일</p>
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
          {hasFile && (
            <div className="pl-5">
              <label className="w-[95%] h-[100px] cursor-pointer text-gray-600 hover:border-origin hover:text-origin flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                <svg
                  className="h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  accept="image/*"
                  className="hidden"
                  multiple={true}
                  type="file"
                />
              </label>
            </div>
          )}
          <div className="p-5 flex flex-col items-start space-y-4">
            <p className="w-[80px]">내용</p>
            <textarea className="w-full h-[200px] border rounded-md shadow-md resize-none p-3" />
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

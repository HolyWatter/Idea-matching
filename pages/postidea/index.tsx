import { useState, useRef } from "react";
import axios from "axios";
import { Input } from "../../components/BtnInput/Input";
import { API } from "../../config";
import CategoryModal from "../../components/IdeaComponent/CategoryModal";
import { useRouter } from "next/router";
import { IdeaInfo, File } from "../../components/State/interface";

export default function PostIdea() {
  const [ideaInfo, setIdeaInfo] = useState<IdeaInfo>({
    title: "",
    category: "카테고리를 선택해주세요",
    description: "",
    tag: [],
  });
  const [fileList, setFileList] = useState<File[] | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isCategoryModal, setIsCategoryModal] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const router = useRouter();

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
  };

  const inputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const submitTags = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIdeaInfo({
      ...ideaInfo,
      tag: [...ideaInfo.tag, tag],
    });
    setTag("");
  };

  const clickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    let newTagList = ideaInfo.tag.filter(
      (item) => item !== e.currentTarget.value
    );
    setIdeaInfo({
      ...ideaInfo,
      tag: newTagList,
    });
  };

  async function clickPost() {
    const files = new FormData();
    files.append("title", ideaInfo.title);
    files.append("description", ideaInfo.description);
    files.append("tag", ideaInfo.tag as any);
    files.append("category", ideaInfo.category as any);
    fileList?.forEach((item: any) => files.append("files", item));
    try {
      const response = await axios.post(`${API.create}`, files, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "multipart/form-data; charset=UTF-8",
        },
      });
      if (response.status === 201) {
        alert("게시글을 등록했습니다.");
        router.push("/");
      }
    } catch {}
  }
  return (
    <div className="flex w-full items-start justify-center pb-20 md-m:px-10 md:px-20">
      <div className="w-[840px]">
        <p className="text-lg font-semibold">아이디어 등록</p>
        <div className="space-y-5">
          <div className="flex items-center space-x-8"></div>
          <button
            className="flex items-center space-x-2 text-sm text-gray-400"
            onClick={clickCategory}
          >
            <p>{ideaInfo.category}</p>
            <svg
              className="h-3 w-3"
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
            <div className="absolute top-[160px]">
              <CategoryModal
                setIsCategoryModal={setIsCategoryModal}
                setIdeaInfo={setIdeaInfo}
                ideaInfo={ideaInfo}
              />
            </div>
          )}
        </div>
        <div className="py-7">
          <div className="w-full items-center pb-5 text-lg">
            <div className="flex flex-col space-y-3">
              <input
                className="w-[100%] border-b bg-bg py-2 text-xl focus:outline-none"
                placeholder="제목을 입력해 주세요"
                value={ideaInfo.title}
                onChange={handleInput}
                name="title"
                type="text"
              />
              <form onSubmit={submitTags}>
                <input
                  onChange={inputTag}
                  className="w-[100%] border-b bg-bg py-2 focus:outline-none"
                  placeholder="태그를 입력하세요."
                  value={tag}
                />
              </form>
              <div className="mt-3 flex w-full flex-wrap space-x-2">
                {ideaInfo.tag.map((item, idx) => (
                  <div
                    key={idx}
                    className="mb-2 flex items-center space-x-3 rounded-full bg-origin px-2 py-1 text-white"
                  >
                    <p className="text-xs">{item}</p>
                    <button value={item} onClick={clickDelete}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="flex w-full"
              >
                <label className="mr-10 flex h-8 w-[80px] cursor-pointer items-center justify-center rounded-md border-2 border-gray-300 text-gray-600 hover:border-origin hover:text-origin">
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
                <div className="flex w-full items-center">
                  {fileList && (
                    <div className="space-y-2 rounded-md border px-3 py-3 shadow-md">
                      {fileList?.map((item: any) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between"
                        >
                          <p className="px-2">{item.name}</p>
                          <svg
                            className="h-3 w-3"
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
              </form>
            </div>
          </div>
          <div className="py-5">
            <textarea
              placeholder="본문을 입력해주세요"
              className="focus h-[200px] w-full resize-none rounded-sm border p-5 focus:border-origin focus:outline-none "
              onChange={handleInput}
              value={ideaInfo.description}
              name="description"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button className="w-32 rounded-md border bg-gray-500 py-3 text-white shadow-md">
              취소
            </button>
            <button
              className="w-32 rounded-md border bg-origin py-3 text-white shadow-md"
              onClick={clickPost}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//수정사항 : 카테고리를 str으로 바꿀 수 있는지..?

export default function Register() {
  return (
    <>
      <></>
    </>
  );
}
// import { useState, useRef } from "react";
// import axios from "axios";
// import { Input } from "../../components/BtnInput/Input";
// import { API } from "../../config";
// import CategoryModal from "../../components/IdeaComponent/CategoryModal";
// import { useRouter } from "next/router";
// import { IdeaInfo, File } from "../../components/State/interface";

// export default function IdeaAdd() {
//   const [ideaInfo, setIdeaInfo] = useState<IdeaInfo>({
//     title: "",
//     category: 1,
//     description: "",
//     tag: [],
//   });

//   const [fileList, setFileList] = useState<File[] | null>();
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [isCategoryModal, setIsCategoryModal] = useState<boolean>(false);
//   const [tag, setTag] = useState<string>("");
//   const router = useRouter();

//   const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFileList(Object.values(e.target.files as any));
//     }
//   };

//   const handleInput = (
//     e:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setIdeaInfo({
//       ...ideaInfo,
//       [name]: value,
//     });
//   };

//   const clickCategory = () => {
//     setIsCategoryModal((prev) => !prev);
//   };

//   const inputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTag(e.target.value);
//   };

//   const submitTags = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIdeaInfo({
//       ...ideaInfo,
//       tag: [...ideaInfo.tag, tag],
//     });
//     setTag("");
//   };

//   const clickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
//     let newTagList = ideaInfo.tag.filter(
//       (item) => item !== e.currentTarget.value
//     );
//     setIdeaInfo({
//       ...ideaInfo,
//       tag: newTagList,
//     });
//   };

//   async function clickPost() {
//     const files = new FormData();
//     files.append("title", ideaInfo.title);
//     files.append("description", ideaInfo.description);
//     files.append("tag", ideaInfo.tag as any);
//     files.append("category", ideaInfo.category as any);
//     fileList?.forEach((item: any) => files.append("files", item));
//     try {
//       const response = await axios.post(`${API.create}`, files, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//           "Content-type": "multipart/form-data; charset=UTF-8",
//         },
//       });
//       if (response.status === 201) {
//         alert("게시글을 등록했습니다.");
//         router.push("/");
//       }
//     } catch {}
//     // const files = new FormData();
//     // files.append("title", ideaInfo.title);
//     // files.append("description", ideaInfo.description);
//     // files.append("tag", ideaInfo.tag as any);
//     // files.append("category", ideaInfo.category as any);
//     // fileList?.forEach((item: any) => files.append("files", item));
//     // try {
//     //   const response = await axios.put(`${API.update}/5`, files, {
//     //     headers: {
//     //       Authorization: localStorage.getItem("token"),
//     //       "Content-type": "multipart/form-data; charset=UTF-8",
//     //     },
//     //   });
//     // } catch {}
//     //업데이트 메서드
//   }

//   return (
//     <div className="flex justify-center sm-m:pb-24">
//       <div className="min-w-[400px] h-[380px] w-[400px] border shadow-lg rounded-md mr-10 sm-m:hidden bg-white">
//         <p className="font-semibold p-5">아이디어를 공유해보세요</p>
//         <div className="border-t" />
//         <div className="flex flex-col items-center w-full mt-10 text-sm space-y-6">
//           {ASIDE_CONTENT_ARR.map((items) => (
//             <p
//               key={items.id}
//               className="text-center w-[90%] py-2 border rounded-full"
//             >
//               {items.text}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="space-y-10 sm-m:w-[645px] sm-m:px-8">
//         <div className="flex flex-col pb-7 border shadow-lg rounded-md bg-white">
//           <p className="font-semibold p-5">아이디어 등록</p>
//           <div className="border-t" />
//           <div className="p-5 flex items-center">
//             <p className="w-[80px] text-center mr-10">제목</p>
//             <Input
//               onChange={handleInput}
//               name="title"
//               type="text"
//               placeholder="아이디어 이름을 입력하세요."
//               value={ideaInfo.title}
//             />
//           </div>
//           <div className="p-5 flex items-center relative">
//             <p className="w-[80px] text-center mr-10">카테고리</p>
//             <button
//               onClick={clickCategory}
//               className="w-[200px] h-10 items-center px-2 flex justify-between border rounded-md shadow-md"
//             >
//               <p>{ideaInfo.category}</p>
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {isCategoryModal && (
//               <div className="absolute top-[59px] left-[140px]">
//                 <CategoryModal setIsCategoryModal={setIsCategoryModal} />
//               </div>
//             )}
//           </div>
//           <div className="p-5 flex items-center">
//             <p className="w-[80px] text-center mr-10">태그</p>
//             <form onSubmit={submitTags}>
//               <Input
//                 onChange={inputTag}
//                 name="tag"
//                 type="text"
//                 placeholder="태그를 입력하세요"
//                 value={tag}
//               />
//             </form>
//           </div>
//           <div className="w-full pl-[140px] space-x-2 flex flex-wrap">
//             {ideaInfo.tag.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center space-x-3 px-2 py-1 bg-origin text-white rounded-full mb-2"
//               >
//                 <p>{item}</p>
//                 <button value={item} onClick={clickDelete}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-4 h-4"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="p-5 flex items-center"></div>
//           <div className="p-5 flex flex-col items-start space-y-4">
//             <p className="w-[80px] text-center">내용</p>
//             <textarea
//               onChange={handleInput}
//               value={ideaInfo.description}
//               name="description"
//               className="focus:outline-none focus:border-origin focus:border-2 w-full h-[200px] border rounded-md shadow-md resize-none p-3"
//             />
//           </div>
//         </div>
//         <div className="flex justify-end space-x-4">
//           <button className="w-32 py-3 border rounded-md bg-gray-500 text-white shadow-md">
//             취소
//           </button>
//           <button
//             className="w-32 py-3 border rounded-md bg-origin text-white shadow-md"
//             onClick={clickPost}
//           >
//             등록하기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const ASIDE_CONTENT_ARR = [
//   { text: "아주 사소한 아이디어라도 좋아요", id: 0 },
//   { text: "아이디어를 공유하면 구현해 줄 수 있는 사람이 모여요", id: 1 },
//   { text: "직접 팀원을 모을 수 있어요", id: 2 },
//   { text: "팀원을 모집하고 기획까지 참여해보세요", id: 3 },
// ];

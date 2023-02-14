import { useState } from "react";
import { useRouter } from "next/router";
import Category from "../../components/Category";
import Image from "next/image";
import { API } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import Comment from "../../components/Comment/Comment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getComments,
  getIdeaDetail,
  postComment,
  postLike,
} from "../../components/State/ApiFunction";

export default function Idea() {
  const [commentText, setCommentText] = useState<string>("");
  const router = useRouter();

  const detailIdeaQuery = useQuery(
    ["getIdeaDetail", router.query.id],
    () => getIdeaDetail(router.query.id),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(router.query.id),
    }
  );


  const commentsQuery = useQuery(
    ["getComments", router.query.id],
    () => getComments(router.query.id),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(router.query.id),
    }
  );

  const queryClient = useQueryClient();

  const commentMutation = useMutation(
    () => postComment(router.query.id, commentText),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getComments");
        queryClient.invalidateQueries("getIdeaDetail");
      },
    }
  );

  const likeMutation = useMutation(() => postLike(router.query.id), {
    onSuccess: () => queryClient.invalidateQueries("getIdeaDetail"),
  });

  const clickLike = () => {
    likeMutation.mutate();
  };

  const clickPostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentMutation.mutate();
    setCommentText("");
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="flex items-start justify-center pb-20 md-m:px-10 md:px-20">
      <Category />
      {detailIdeaQuery.isFetched && (
        <div className="w-[840px]">
          <div className="space-y-5">
            <div className="flex items-center space-x-8">
              <p>
                {detailIdeaQuery.data && detailIdeaQuery.data?.user.username}
              </p>
              <p className="text-xs text-gray-400">
                {detailIdeaQuery.data &&
                  new Intl.DateTimeFormat("KR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(detailIdeaQuery.data?.createdAt))}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              {detailIdeaQuery.data && detailIdeaQuery.data.category.name}
            </p>
            <div className="flex items-end justify-start space-x-3 text-sm">
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5"
                  fill={
                    detailIdeaQuery.data &&
                    detailIdeaQuery.data.postingLikes?.length === 1
                      ? "#EA5856"
                      : "none"
                  }
                  stroke="#EA5856"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <p>
                  {detailIdeaQuery.data &&
                    detailIdeaQuery.data.postingLikesCount}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <p>
                  {detailIdeaQuery.data && detailIdeaQuery.data.commentCount}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <p>{detailIdeaQuery.data && detailIdeaQuery.data.views}</p>
              </div>
            </div>
            <div className="flex space-x-2 text-xs">
              {detailIdeaQuery.data &&
                detailIdeaQuery.data.tags.map((tag) => (
                  <p
                    key={tag.id}
                    className="rounded-full border bg-blue-100 px-3 text-gray-600"
                  >
                    {tag.title}
                  </p>
                ))}
            </div>
          </div>
          <div className="py-7">
            <div className="flex items-center justify-between border-b pb-5 text-lg">
              <p className="">
                {detailIdeaQuery.data && detailIdeaQuery.data.title}
              </p>
              <button>
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
            <div className="py-10 px-5">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                pagination={true}
                modules={[Pagination, Navigation]}
              >
                {detailIdeaQuery.data &&
                  detailIdeaQuery.data.postingImage.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="h-[350px] w-[400px]">
                        <Image alt="" fill src={`${item.url}`} />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <p className="pt-7">
                {detailIdeaQuery.data && detailIdeaQuery.data.description}
              </p>
            </div>
          </div>
          <div className="my-12 flex justify-center space-x-6">
            <button className="h-[50px] w-[50px] rounded-full bg-gray-500 py-2 pl-[13px] text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </button>
            <button
              className="h-[50px] w-[50px] rounded-full bg-white py-2 pl-[10px] text-center"
              onClick={clickLike}
            >
              <svg
                className="h-7 w-7"
                fill={
                  detailIdeaQuery.data &&
                  detailIdeaQuery.data.postingLikes?.length === 1
                    ? "#EA5856"
                    : "none"
                }
                stroke="#EA5856"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <form
            onSubmit={clickPostComment}
            className="my-5 flex flex-col items-end space-y-3"
          >
            <textarea
            value={commentText}
              onChange={handleComment}
              className="h-20 w-full resize-none rounded-sm border p-3 focus:outline-origin"
              placeholder="댓글을 입력하세요"
            />
            <button className="h-10 w-[100px] rounded-md border bg-origin text-white">
              등록하기
            </button>
          </form>
          <div>
            <div className="border-b py-3">
              {commentsQuery.data &&
                commentsQuery.data?.map((item) => (
                  <Comment key={item.id} comment={item} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

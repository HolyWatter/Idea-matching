import Link from "next/link";
import { IdeaList } from "../State/interface";

interface Props {
  idea: IdeaList;
}

export default function Idea({ idea }: Props) {
  console.log(idea);
  const date = new Date(idea.createdAt);
  const timeFormat = new Intl.DateTimeFormat("KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  return (
    <Link href={`/idea/${idea.id}`}>
      <div className="flex min-w-[470px] justify-between border-b py-3">
        <div>
          <div className="flex items-center space-x-5">
            <p className="pl-2 text-lg text-gray-800">{idea.title}</p>
            <p className="text-xs">{timeFormat}</p>
          </div>
          <p className="pl-2 text-sm text-gray-400">{idea.user.username}</p>
          <div className="mt-2 flex space-x-2 text-xs">
            {idea.tags.map((tag) => (
              <p
                key={tag.id}
                className="rounded-full border bg-blue-100 px-3 text-gray-600"
              >
                {tag.title}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-end space-x-3 text-sm">
          <div className="flex items-center space-x-2">
            <svg
              className="h-5 w-5"
              fill={idea.postingLikes?.length === 1 ? "#EA5856" : "none"}
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
            <p>{idea.postingLikesCount}</p>
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
            <p>{idea.commentCount}</p>
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
            <p>{idea.views}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

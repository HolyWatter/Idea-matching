import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  userId: number;
  userNickname: string;
}

interface Attach {
  hasAttach: boolean;
  fileUrl: string[];
}

interface Comments {
  user: User;
  text: string;
  commentLike: number;
}

interface Idea {
  id: number;
  title: string;
  text: string;
  user: User;
  attachments: Attach;
  tags: string[];
  countLike: number;
  comments: Comments;
  isLike: boolean;
  writeDate : string ;
}

export default function Idea() {
  const [idea, setIdea] = useState<Idea | null>(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios({ url: "/data/IDEA_DETAIL.json" });
    setIdea(data.data[0]);
  };
  console.log(idea);
  return (
    <div>
      {idea && (
        <div>
         <p>{idea.title}</p>
         <p>{idea.user.userNickname}</p>
         <p>{idea.writeDate}</p>
        </div>
      )}
    </div>
  );
}

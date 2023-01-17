import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(`http://10.58.52.163:3000/chatting`);

interface IChat {
  username: string;
  message: string;
}

export default function Chat() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [message, setMessage] = useState<string>("");
  //const chatContailnerDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const messageHandler = (chat: IChat) => {
      setChats((prev) => [...prev, chat]);
    };
    socket.on("message", messageHandler);

    return () => {
      socket.off("message", messageHandler);
    };
  }, []);

  const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("message", message, (chat: IChat) => {
        setChats((prev) => [...prev, chat]);
        setMessage("");
      });
    }
  };
  //emit 메서드는 첫 번째 인수에 이벤트 이름, 두 번째 인수로 전송할 데이터, 세 번쨰 인수로 콜백 함수 (서버측 응답이 오면 실행할 코드)
  return (
    <div>
      <div>
        <div>메세지 입력될 곳</div>
        <form onSubmit={sendMessage}>
          <input
            onChange={inputText}
            className="w-[300px] py-2 pl-2"
            placeholder="메세지를 입력하세요"
          />
          <button className="border">보내기</button>
        </form>
      </div>
    </div>
  );
}

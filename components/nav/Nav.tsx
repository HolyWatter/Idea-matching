import { useRouter } from "next/router";
import { useState } from "react";

export default function Nav() {
  const [keyWord, setKeyWord] = useState<string>("");
  const router = useRouter();

  const inputKeyWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  };
  const clickSignUp = () => {
    router.push("/signup");
  };
  const clickLogin = () => {
    router.push("/login");
  };
  const clickLogo = () => {
    router.push("/");
  };
  return (
    <div className="fix top-0 flex py-5 border-b justify-between items-center sm-m:justify-center z-20">
      <div className="flex items-center space-x-6">
        <div onClick={clickLogo} className="ml-10 text-3xl font-bold">
          Logo
        </div>
        <div className="font-semibold space-x-4 md-m:hidden">
          <button>아이디어 등록</button>
          <button>아이디어 찾기</button>
        </div>
      </div>
      <input
        onChange={inputKeyWord}
        className="pl-3 focus:outline-none border w-52 h-8 rounded-full text-sm focus:border-gray-600 md-m:hidden"
        placeholder="검색"
        value={keyWord}
      />
      <div className="space-x-2 mr-6 sm-m:hidden">
        <button
          onClick={clickLogin}
          className="w-20 h-10 rounded-md text-white bg-gray-500 border shadow-md"
        >
          로그인
        </button>
        <button
          onClick={clickSignUp}
          className="w-20 h-10 rounded-md text-white bg-lime-600 border shadow-md"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserModal } from "./Modal/UserModal";

export default function Nav() {
  const [isToken, setIsToken] = useState<boolean>(false);
  const [isUserModal, setIsUserModal] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, [isToken]);

  const router = useRouter();
  const inputKeyWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  };
  const clickSignUp = () => {
    router.push("/signup");
  };
  const clickLogin = () => {
    setIsToken(true);
    router.push("/login");
  };
  const clickLogo = () => {
    router.push("/");
  };
  const clickResister = () => {
    router.push("/idea");
  };
  const clickLookUp = () => {
    router.push("/lookup");
  };
  const clickMenuBar = () => {
    setIsUserModal((prev) => !prev);
  };

  return (
    <div className="w-full fixed top-0 flex py-5 border-b justify-between items-center bg-white sm-m:justify-center z-20">
      <div className="flex items-center space-x-6">
        <div onClick={clickLogo} className="ml-10 text-3xl font-bold">
          Logo
        </div>
        <div className="font-semibold space-x-4 md-m:hidden">
          <button onClick={clickResister}>아이디어 등록</button>
          <button onClick={clickLookUp}>아이디어 찾기</button>
        </div>
      </div>
      <div className="flex items-center space-x-5 mr-6 sm-m:hidden">
        <input
          onChange={inputKeyWord}
          className="pl-3 focus:outline-none border w-52 h-8 rounded-full text-sm focus:border-gray-600 md-m:hidden"
          placeholder="검색"
          value={keyWord}
        />
        {isToken ? (
          <svg
            onClick={clickMenuBar}
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        ) : (
          <div className="space-x-2">
            <button
              onClick={clickLogin}
              className="w-20 h-10 rounded-md text-white bg-gray-500 border shadow-md"
            >
              로그인
            </button>
            <button
              onClick={clickSignUp}
              className="w-20 h-10 rounded-md text-white bg-origin border shadow-md"
            >
              회원가입
            </button>
          </div>
        )}
      </div>
      {isUserModal && (
        <UserModal setIsToken={setIsToken} setIsUserModal={setIsUserModal} />
      )}
    </div>
  );
}

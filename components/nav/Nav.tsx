import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../State/Atom";
import { UserModal } from "./Modal/UserModal";

export default function Nav() {
  const setLoginStatus = useSetRecoilState(loginState);
  const loginStatus = useRecoilValue(loginState);
  const [isUserModal, setIsUserModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);
  const clickSignUp = () => {
    router.push("/signup");
  };
  const clickLogin = () => {
    router.push("/login");
  };
  const clickLogo = () => {
    router.push("/");
  };
  const clickResister = () => {
    router.push("/postidea");
  };
  const clickList = () => {
    router.push("/list");
  };
  const clickMenuBar = () => {
    setIsUserModal((prev) => !prev);
  };

  return (
    <div className="fixed top-0 z-20 flex w-full items-center justify-between border-b bg-white py-5 sm-m:justify-center">
      <div className="flex items-center space-x-3">
        <div onClick={clickLogo} className="ml-10 text-3xl font-bold sm-m:ml-0">
          Logo
        </div>
        <div className="space-x-4 font-semibold sm-m:hidden">
          <button onClick={clickResister}>아이디어 등록</button>
          <button onClick={clickList}>아이디어 목록</button>
        </div>
      </div>
      <div className="mr-6 flex items-center space-x-3 sm-m:hidden">
        {loginStatus ? (
          <svg
            onClick={clickMenuBar}
            className="h-8 w-8"
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
          <div className="space-x-1">
            <button
              onClick={clickLogin}
              className="h-10 w-20 rounded-md border bg-gray-500 text-white shadow-md"
            >
              로그인
            </button>
            <button
              onClick={clickSignUp}
              className="h-10 w-20 rounded-md border bg-origin text-white shadow-md"
            >
              회원가입
            </button>
          </div>
        )}
      </div>
      {isUserModal && <UserModal setIsUserModal={setIsUserModal} />}
    </div>
  );
}

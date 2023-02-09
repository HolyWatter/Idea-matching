import { FC, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../State/Atom";

interface Props {
  setIsUserModal: Dispatch<SetStateAction<boolean>>;
}

export const UserModal: FC<Props> = ({ setIsUserModal }) => {
  const router = useRouter();
  const setLoginStatus = useSetRecoilState(loginState);
  const clickUserInfo = () => {
    setIsUserModal((prev) => !prev);
    router.push("/userinfo");
  };
  const clickActivityLog = () => {
    setIsUserModal((prev) => !prev);
    router.push("/log");
  };
  const clickLogout = () => {
    localStorage.removeItem("token");
    setLoginStatus(false);
    setIsUserModal((prev) => !prev);
    router.push("/");
  };
  return (
    <div className="absolute right-3 top-[76px] z-30 w-40 space-y-5 rounded-sm border bg-white p-3 text-xl">
      <button onClick={clickUserInfo} className="flex items-center space-x-4">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>회원정보</div>
      </button>
      <button
        onClick={clickActivityLog}
        className="flex items-center space-x-4"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>활동로그</div>
      </button>
      <button onClick={clickLogout} className="flex items-center space-x-4">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <div>로그아웃</div>
      </button>
    </div>
  );
};

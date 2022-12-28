import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { Input } from "../../components/BtnInput/Input";

interface LoginInfo {
  email: string;
  password: string;
}

export default function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };
  const router = useRouter();

  const clickSignUpBtn = () => {
    router.push("/signup");
  };
  async function postLogin() {
    await axios.post("", {
      loginInfo,
    });
    try {
      alert("로그인되었습니다.");
      router.push("/");
    } catch {
      alert("로그인정보를 확인해주세요");
    }
  }
  const clickSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center">
      <p className="my-12 text-7xl font-bold text-gray-800">000</p>
      <p className="text-gray-700">000은 아이디어 공유플랫폼입니다.</p>
      <p className="text-gray-400 py-8">로그인 정보를 입력해주세요</p>
      <form>
        <div className="space-y-4">
          <div className="space-y-2">
            <p>이메일</p>
            <Input
              onChange={handleInput}
              placeholder="이메일을 입력하세요"
              type="email"
              value={loginInfo.email}
              name="email"
            />
          </div>
          <div className="space-y-2">
            <p>비밀번호</p>
            <Input
              onChange={handleInput}
              placeholder="이메일을 입력하세요"
              type="password"
              value={loginInfo.password}
              name="password"
            />
          </div>
        </div>
        <button
          onClick={clickSubmit}
          className="w-96 h-12 mt-12 rounded-full border text-white bg-origin shadow-md "
        >
          로그인
        </button>
      </form>
      <div className="my-4 space-x-5 flex">
        <p>아직 회원이 아니신가요?</p>
        <button onClick={clickSignUpBtn} className="text-blue-400 underline">
          회원가입
        </button>
      </div>
    </div>
  );
}

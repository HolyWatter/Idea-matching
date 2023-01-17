import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Input } from "../../components/BtnInput/Input";
import { API } from "../../config";
import { SignUpInfo } from "../../components/State/interface";

export default function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    username: "",
    nickname: "",
  });

  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpInfo({
      ...signUpInfo,
      [name]: value,
    });
  };

  async function postUser() {
    try {
      await axios.post(API.signup, signUpInfo);
      alert("회원가입에 성공했습니다.");
      router.push("/login");
    } catch (error: any) {
      alert(ERROR_MESSAGE_SIGNUP[error.response.data.message]);
    }
  }

  const clickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postUser();
  };

  const clickToLoginBtn = () => {
    router.push("/login");
  };

  return (
    <div className="m-auto flex flex-col items-center">
      <p className="my-12 text-7xl font-bold text-gray-800">000</p>
      <p className="text-gray-700">000은 아이디어 공유플랫폼입니다.</p>
      <p className="py-8 text-gray-400">
        회원가입에 필요한 정보를 입력해주세요
      </p>
      <form onSubmit={clickSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <p>이메일</p>
            <Input
              onChange={handleInput}
              placeholder="이메일을 입력하세요"
              type="email"
              value={signUpInfo.email}
              name="email"
            />
          </div>
          <div className="space-y-2">
            <p>비밀번호</p>
            <Input
              onChange={handleInput}
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={signUpInfo.password}
              name="password"
            />
          </div>
          <div className="space-y-2">
            <p>이름</p>
            <Input
              onChange={handleInput}
              placeholder="홍길동"
              type="text"
              value={signUpInfo.username}
              name="username"
            />
          </div>
          <div className="space-y-2">
            <p>닉네임</p>
            <Input
              onChange={handleInput}
              placeholder="사용하실 별명을 입력해주세요."
              type="text"
              value={signUpInfo.nickname}
              name="nickname"
            />
          </div>
        </div>
        <button className="mt-12 h-12 w-96 rounded-full border bg-origin text-white shadow-md ">
          회원가입
        </button>
      </form>
      <div className="my-4 flex space-x-5">
        <p>이미 회원이신가요?</p>
        <button onClick={clickToLoginBtn} className="text-blue-400 underline">
          로그인
        </button>
      </div>
    </div>
  );
}

const ERROR_MESSAGE_SIGNUP: { [key: string]: string } = {
  "conflict email": "이미 가입된 메일입니다.",
  "conflict nickname": "이미 가입된 닉네임입니다.",
  "Invalid password":
    "비밀번호를 영어, 숫자, 특수문자 8자리 이상으로 작성해주세요",
};

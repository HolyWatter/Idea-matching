import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Input } from "../../components/BtnInput/Input";

interface Info {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

export default function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState<Info>({
    email: "",
    password: "",
    name: "",
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
    await axios.post("", { signUpInfo });
    try {
      alert("회원가입에 성공했습니다.");
      router.push("/");
    } catch {
      //FIXME 코드별 예외처리가 필요
      alert("서버와의 통신이 원활하지 않습니다.");
    }
  }

  const clickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postUser();
  };

  const clickToLoginBtn = ()=>{
    router.push('/login')
  }

  return (
    <div className="flex flex-col items-center m-auto">
      <p className="my-12 text-7xl font-bold text-gray-800">000</p>
      <p className="text-gray-700">000은 아이디어 공유플랫폼입니다.</p>
      <p className="text-gray-400 py-8">
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
              placeholder="이메일을 입력하세요"
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
              value={signUpInfo.name}
              name="name"
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
        <button className="w-96 h-12 mt-12 rounded-full border text-white bg-origin shadow-md ">
          회원가입
        </button>
      </form>
      <div className="my-4 space-x-5 flex">
        <p>이미 회원이신가요?</p>
        <button onClick={clickToLoginBtn} className="text-blue-400 underline">
          로그인
        </button>
      </div>
    </div>
  );
}

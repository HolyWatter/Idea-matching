import { useState, createContext } from "react";

const [isLogin, setIsLogin] = useState<boolean>(false);

export const Context = createContext({
  isLogin,
  setIsLogin,
});

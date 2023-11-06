/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface ChatContextinterface {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<string>> | undefined;
  search: boolean;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  user: "",
  setUser: (user: string) => {},
  // search: false,
  // setSearch: (search: boolean) => {},
} as ChatContextinterface;

type ChildProps = {
  children: ReactNode;
};

const ChatContext = createContext(defaultState);
// const  Provider  = ChatContext;
// const searchContext = createContext(defaultState);
const ChatProvider = ({ children }: ChildProps) => {
  const [user, setUser] = useState<string>(defaultState.user);
  const [search, setSearch] = useState<boolean>(defaultState.search);

  const values = {
    user,
    setUser,
    search,
    setSearch,
  };
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") as string);
    console.log(userInfo);

    if (userInfo) {
      setUser(userInfo);
    }
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

const ChatState = () => {
  return useContext(ChatContext);
};

export { ChatProvider, ChatState };

import { createContext } from "react";
import { useState } from "react/cjs/react.development";

const defaultErrMsg = {
  show: false,
  type: 'error',
  msg: ''
};

export const CustomMessageContext = createContext({
  msg: defaultErrMsg,
  setMsg: (_) => { }
});

export function CustomMessageProvider({ children }) {
  const [msgState, setMsgState] = useState(defaultErrMsg);

  const contextValue = {
    msg: msgState,
    setMsg: (v) => setMsgState(v)
  };

  return (
    <CustomMessageContext.Provider value={contextValue}>
      {children}
    </CustomMessageContext.Provider>
  );
}
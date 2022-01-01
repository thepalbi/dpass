const { useContext } = require("react")
const { CustomMessageContext } = require("./context")

export default function useMsg() {
  const { msg, setMsg } = useContext(CustomMessageContext);
  return { msg, setMsg };
}
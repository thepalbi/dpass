import useMsg from "./hook"

export default function ErrorPopup() {
  const { msg, setMsg } = useMsg();

  return (
    <>
      <style jsx>{`
        .alert {
            padding: 20px;
            background-color: #f44336;
            color: white;
          }
          
          .closebtn {
            margin-left: 15px;
            color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
          }
          
          .closebtn:hover {
            color: black;
          }
        `}</style>
      <div className="alert" style={{display: msg?.show ? 'block' : 'none'}}>
        <span className="closebtn" onClick={() => {
          setMsg({
            show: false,
            type: msg?.type,
            msg: ''
          });
        }}>&times;</span>
        {msg?.msg}
      </div>
    </>
  )
}
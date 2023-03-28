import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
// import ChatMessage from "./ChatMessage.jsx";
// import "../../App.css";
import styles from "./ChatBox.module.css";

const ChatBox = (props) => {
  const [state, setState] = useState({
    message: "",
    name: props.name,
  });
  // const [users, setUsers] = useState([]);
  const [chat, setChat] = useState([]);
  const room = useRef(props.room);
  const socketRef = useRef();

  useEffect(() => {
    if (room) {
      socketRef.current = io("http://localhost:4000", {
        query: { roomId: room.current },
      });
    }
    userjoin(state.name, room.current);
    return () => {
      socketRef.current.disconnect("leave", state.name);
    };
  }, [state.name]);

  useEffect(() => {
    socketRef.current.on("message", ({ name, message }) => {
      // console.log("The server has sent some data to all clients");
      setChat([...chat, { name, message }]);
    });

    socketRef.current.on("user_join", function (data) {
      setChat([
        ...chat,
        {
          name: "Server",
          message: `${data} has joined the chat`,
        },
      ]);
      // setUsers([...users, data]);
    });

    socketRef.current.on("user_leave", function (data) {
      setChat([
        ...chat,
        {
          name: "Server",
          message: `${data} has left the chat`,
        },
      ]);
      // setUsers(users.filter((user) => user !== data));
    });

    return () => {
      socketRef.current.off("message");
      socketRef.current.off("user_join");
      socketRef.current.off("user_leave");
    };
  }, [chat]);

  const userjoin = (name, room) => {
    socketRef.current.emit("user_join", name, room);
  };

  // const userleave = (name, room) => {
  //   setState({ ...state, name: "" });
  //   socketRef.current.emit("user_leave", name, room);
  //   socketRef.current.disconnect();
  // };

  const onMessageSubmit = (e) => {
    let msgEle = document.getElementById("message");
    console.log([msgEle.name], msgEle.value);
    setState({ ...state, [msgEle.name]: msgEle.value });
    socketRef.current.emit(
      "message",
      {
        name: state.name,
        message: msgEle.value,
      },
      room
    );
    e.preventDefault();
    setState({ message: "", name: state.name });
    msgEle.value = "";
    msgEle.focus();
  };

  // const renderUsers = () => {
  //   return users.map((user, index) => (
  //     <div key={index}>
  //       <h3>{user}</h3>
  //     </div>
  //   ));
  // };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index} className={styles.chat_mes}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.chat_header}>
          {/* <h1>Chat Log</h1> */}
          {/* <Link to="/">Leave chat</Link> */}
        </div>
        {/* <div className={styles.render_users}>{renderUsers()}</div> */}
        <div className={styles.render_chat}>{renderChat()}</div>
        <form onSubmit={onMessageSubmit}>
          {/* <h1>Messenger</h1> */}
          <div className={styles.input_chat}>
            <label htmlFor="message">
              Send a message
              <input
                name="message"
                id="message"
                variant="outlined"
                label="Message"
              />
            </label>
            <button>Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;

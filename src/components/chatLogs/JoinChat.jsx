import React, { useState, useEffect } from "react";
import ChatLog from "./ChatBox";

const JoinChat = (props) => {
  const [room, setRoom] = useState("general");
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("room changed", room);
  }, [room]);

  const onPress = (value) => {
    setRoom(value);
    setToggle(!toggle);
    console.log("value", room);
    console.log("toggle", toggle);
  };

  const onLeave = () => {
    setRoom("general");
    setToggle(!toggle);
  };

  return (
    <div>
      <button className="close-button" onClick={() => setOpen(!open)}>
        {!open ? "Open Chat" : "Close Chat"}
      </button>
      {open && toggle && (
        <div className="chat-name">
          <h1>Chat Name: {room}</h1>
          <button onClick={() => onLeave()}>Leave Chat</button>
        </div>
      )}
      {open && !toggle && (
        <div className="join-chat">
          <h1>Join Chat</h1>
          <button onClick={() => onPress("room1")}>Submit Roof Picture</button>
          <button onClick={() => onPress("room2")}>Sign Contract</button>
          <button onClick={() => onPress("room3")}>Order Equipment</button>
        </div>
      )}
      {open && toggle ? (
        <ChatLog room={room} name="user" />
      ) : (
        <p>No chat joined...</p>
      )}
    </div>
  );
};

export default JoinChat;

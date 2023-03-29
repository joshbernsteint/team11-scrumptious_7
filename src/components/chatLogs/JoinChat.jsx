import React, { useState, useEffect } from "react";
import ChatLog from "./ChatBox";
import styles from "./JoinChat.module.css";

const JoinChat = (props) => {
  const [room, setRoom] = useState("general");
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [taskName, setTaskName] = useState("task");

  useEffect(() => {
    // console.log("room: ", room);
  }, [room]);

  // will update room name and set the chat visible
  const onPress = (value, task) => {
    setRoom(value);
    setToggle(!toggle);
    setTaskName(task);
  };

  const onClose = () => {
    setOpen(!open);
    setToggle(false);
  };

  // will update room name and set the chat to not visible
  const onLeave = () => {
    setRoom("general");
    setToggle(!toggle);
  };

  const changeName = (e) => {
    e.preventDefault();
    setName(temp);
  };
  const tasks = props.tasks;
  return (
    <div className={styles.main_chat}>
      <div className={styles.room_header}>
        <button
          aria-label="close-button"
          className="close-button"
          onClick={() => onClose()}
        >
          {!open ? "Open Chat" : "Close Chat"}
        </button>
        {open && toggle && (
          <div className={styles.chat_name}>
            <h1>Task: {taskName}</h1>
            <button onClick={() => onLeave()}>Leave Chat</button>
          </div>
        )}
      </div>
      {open && !name && (
        <div className={styles.room_header}>
          <h1>Input a name</h1>
          <form onSubmit={changeName} aria-label="name-form">
            <input
              aria-label="name-prompt"
              type="text"
              placeholder="Name"
              name="changeName"
              className={styles.inputOne}
              onChange={(e) => setTemp(e.target.value)}
            />
            <button aria-label="confirm">Confirm</button>
          </form>
        </div>
      )}
      {name && (
        <div>
          {open && !toggle && (
            <div className={styles.join_chat}>
              <h1>Join A Task Chat</h1>
              {/* <button
                className={styles.task_chat}
                onClick={() => onPress("room1", "Submit Roof Hahaha")}
              >
                Submit Roof Picture
              </button>
              <button
                className={styles.task_chat}
                onClick={() => onPress("room2", "Sign Contract")}
              >
                Sign Contract
              </button>
              <button
                className={styles.task_chat}
                onClick={() => onPress("room3", "Order Equipment")}
              >
                Order Equipment
              </button> */}
              {tasks.map((task, idx) => (
                <button
                  aria-label={`task_chat${idx}`}
                  className={styles.task_chat}
                  onClick={() => onPress(`room${idx}`, task.title)}
                >
                  {task.title}
                </button>
              ))}
            </div>
          )}
          {open && toggle ? (
            <ChatLog room={room} name={name} />
          ) : (
            <p>{open ? "No chat joined..." : ""}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinChat;

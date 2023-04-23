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
  const spanishTranslation = props.spaTranslation;

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
  // another comment
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
          {!open ? !spanishTranslation? "Open Chat":"Abrir el chat" : !spanishTranslation?"Close Chat":"Cerrar el chat"}
        </button>
        {open && toggle && (
          <div className={styles.chat_name}>
            <h1>{!spanishTranslation?"Task":"Tarea"}: {taskName}</h1>
            <button onClick={() => onLeave()}>{!spanishTranslation?"Leave Chat":"Dejar el chat"}</button>
          </div>
        )}
      </div>
      {open && !name && (
        <div className={styles.room_header}>
          <h1>{!spanishTranslation?"Input a name":"Ingrese un nombre"}</h1>
          <form onSubmit={changeName} aria-label="name-form">
            <input
              aria-label="name-prompt"
              type="text"
              placeholder={!spanishTranslation?"Name":"Nombre"}
              name="changeName"
              className={styles.inputOne}
              onChange={(e) => setTemp(e.target.value)}
            />
            <button aria-label="confirm">{!spanishTranslation?"Confirm":"Confirmar"}</button>
          </form>
        </div>
      )}
      {name && (
        <div>
          {open && !toggle && (
            <div className={styles.join_chat}>
              <h1>{!spanishTranslation?"Join A Task Chat":"Elige un chat"}</h1>
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
                  key={idx}
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
            <ChatLog room={room} name={name} spaTranslation={spanishTranslation}/>
          ) : (
            <p>{open ? !spanishTranslation?"No chat joined...":"No has entrado en un chat" : ""}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinChat;

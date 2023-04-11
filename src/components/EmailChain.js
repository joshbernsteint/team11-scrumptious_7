import React, { useState, useEffect } from "react";
import "../App.css";
import emailjs from "@emailjs/browser";
import { getAuth } from "firebase/auth";
import { ref, getDatabase, child, get } from "firebase/database";

function EmailChain(props) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [users, setUsers] = useState([]);
  const [usersName, setUsersName] = useState([]);
  const [emlbtn, setEmlbtn] = useState(false);
  const [error, setError] = useState(null);

  async function getUser(uid) {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `users/${uid}`));
      if (snapshot.exists) {
        return snapshot.val();
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let usersArray = []
    const fetchData = async () => {
      await props.users.map(async (uid)=>{
        let userInfo = await getUser(uid);
        usersArray = [...usersArray, userInfo]
        setUsers(usersArray);
      })
    }
    fetchData();
    
  }, []);

  const clickHandler = () => {
    setError(null)
    setEmlbtn((prev) => !prev);
    const userNameList = users.map((user) => {
      return user.firstName;
    });
    setUsersName(
      userNameList.map((name) => {
        return <li key={name}>{name}</li>;
      })
    );
  };

  const sumbitHandler = (event) => {
    event.preventDefault();
    const message = document.getElementById("eml-msg").value;
    if (!user) {
      setError("Error: need to sign in to send email chain")
      return;
    }
    if(!message || message.trim().length < 1){
        setError("Error: message cannot be blank")
        return;
    }
    setError(null)
    users.map((user) => {
      sendEmail(user, message);
    });
  };

  const sendEmail = (user, message) => {
    emailjs
      .send(
        "service_mwt8t37",
        "template_2xeuico",
        {
          to_name: user.name,
          to_email: user.email,
          message: message,
          from_name: "Management Team",
        },
        "PkhGQLnUZHu0EHURj"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div className="eml-chain-div">
      <button className="eml-btn" onClick={clickHandler}>
        Send to Email Chain
      </button>
      {emlbtn && <div className="userNames-div"><h2 className="people-h2">People:</h2><ul>{usersName}</ul></div>}
      {error && <p className="error">{error}</p>}
      {emlbtn && (
        <div className="eml-form-div">
        <form onSubmit={sumbitHandler}>
          <label className="lbl-msg">Message</label>
          <br></br>
          <input type="text" id="eml-msg"></input>
          <button type="submit">Send</button>
        </form>
        </div>
      )}
    </div>
  );
}

export default EmailChain;

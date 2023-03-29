import React, { useState, useEffect } from "react";
import "../App.css";
import emailjs from "@emailjs/browser";
import { getAuth } from "firebase/auth";

function EmailChain() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [users, setUsers] = useState([]);
  const [usersName, setUsersName] = useState([]);
  const [emlbtn, setEmlbtn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // mock users
    // const user1 = { name: "Jasmine", email: "jperez11@stevens.edu" };
    // const user2 = { name: "Campbell", email: "ctedtsen@stevens.edu" };
    const user3 = { name: "Josh B", email: "jbernst1@stevens.edu"};
    const user4 = { name: "Josh G", email: "jgorman4@stevens.edu"};
    setUsers([user3, user4]);
  }, []);

  const clickHandler = () => {
    setError(null)
    setEmlbtn((prev) => !prev);
    const userNameList = users.map((user) => {
      return user.name;
    });
    setUsersName(
      userNameList.map((name) => {
        return <li key={name}>{name}</li>;
      })
    );
  };

  const sumbitHandler = (event) => {
    // check that user is signed in
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
      {error && <p>{error}</p>}
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

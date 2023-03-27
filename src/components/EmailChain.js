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

  useEffect(() => {
    // mock users
    const user1 = { name: "Jasmine", email: "jperez11@stevens.edu" };
    //const user2 = { name: "Campbell", email: "ctedtsen@stevens.edu" };
    setUsers([user1]);
  }, []);

  const clickHandler = () => {
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
      console.log("error");
      return <p>Error: need to sign in to send email chain</p>;
    }
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
    <div>
      <button className="eml-btn" onClick={clickHandler}>
        Send to Email Chain
      </button>
      {emlbtn && <ul>{usersName}</ul>}
      {emlbtn && (
        <form onSubmit={sumbitHandler}>
          <label className="lbl-msg">Message</label>
          <br></br>
          <input type="text" id="eml-msg"></input>
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}

export default EmailChain;

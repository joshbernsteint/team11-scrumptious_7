import React, { useState, useEffect } from "react";
import "../App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { auth } from "../firebase.js";

export default function CreateProject() {
  const [uid, setUid] = useState(undefined);
  const [customerUid, setCustomerUid] = useState(undefined);
  const [customer, setCustomer] = useState(undefined);
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [customerExists, setCustomerExists] = useState(false);

  const getUserFromDb = async () => {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `users/${uid}`));
      if (snapshot.exists()) {
        setSignedInUser(snapshot.val());
      }
    } catch (e) {
      console.log(e);
      console.log("user not found");
    }
  };

  const getCustomerFromDb = async () => {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `users/${customerUid}`));
      if (snapshot.exists()) {
        setCustomer(snapshot.val());
        setCustomerExists(true);
      } else {
        //setMessage("User does not exist");
        console.log("user does not exist");
      }
    } catch (e) {
      console.log(e);
      console.log("user not found");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUid(user.uid);
      } else {
        console.log("User not signed in");
      }
    });
  }, [auth, uid]);

  useEffect(() => {
    if (uid) {
      getUserFromDb();
    }
  }, [uid, signedInUser]);

  useEffect(() => {
    if (customerUid) {
      try {
        getCustomerFromDb();
        setMessage("Project successfully created");
      } catch (e) {
        setMessage("No user with that id");
      }
    }
  }, [customerUid]);

  function handleProjectCreation(event) {
    /*let project = {
            manager: uid,
            step: 1,
            customer: customerUid
        };*/

    event.preventDefault();
    if (customerExists) {
      updateCustomerProject(customerUid, uid);
      setLoading(false);
    } else {
      setMessage("User does not exist");
    }
  }

  function updateCustomerProject(uid, project) {
    const db = getDatabase();

    let updates = {};
    updates["/users/" + uid + "/projectManager"] = project;
    update(ref(db), updates);
    return;
  }

  if (loading) {
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  } else {
    if (signedInUser && signedInUser.userType === "manager") {
      //console.log(signedInUser.userType)
      return (
        <div className="register-container">
          {message && <p>{message}</p>}
          <form onSubmit={handleProjectCreation} className="form">
            <div>
              <label className="label">User Id</label>
              <input
                type="text"
                placeholder="uid"
                name="uid"
                className="input"
                onChange={(e) => setCustomerUid(e.target.value)}
              />
            </div>
            <button>Assign Project to Yourself</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p>You must be a manager to assign a project to yourself</p>
        </div>
      );
    }
  }
}

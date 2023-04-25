import React, { useState, useEffect } from "react";
import "../App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { auth } from "../firebase.js";

export default function CreateProject(props) {
  const [uid, setUid] = useState(undefined);
  const [customerUid, setCustomerUid] = useState(undefined);
  const [customer, setCustomer] = useState(undefined);
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [customerExists, setCustomerExists] = useState(false);
  const spanishTranslation = props.spaTranslation;
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
        let msg;
        if(!spanishTranslation){
          msg = "Project successfully created";
        }else{
          msg = "Proyecto creado con éxito";
        }
        setMessage(msg);
      } catch (e) {
        let msg;
        if(!spanishTranslation){
          msg = "No user with that id";
        }else{
          msg = "Ningún usuario con ese id existe";
        }
        setMessage(msg);
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
      let msg;
      if(!spanishTranslation){
        msg = "User does not exist";
      }else{
        msg = "El usuario no existe";
      }
      setMessage(msg);
    }
  }

  function updateCustomerProject(uid, project) {
    const db = getDatabase();

    let updates = {};
    updates["/users/" + uid + "/projectManager"] = project;
    updates['/users/' + uid + '/step'] = 1;
    update(ref(db), updates);
    return;
  }

  if (loading) {
    return (
      <div>
        <h2>{!spanishTranslation?"loading...":"cargando..."}</h2>
      </div>
    );
  } else {
    if (signedInUser && signedInUser.userType === "manager") {
      return (
        <div className="register-container">
          {message && <p>{message}</p>}
          <form onSubmit={handleProjectCreation} className="form">
            <div>
              <label className="label">{!spanishTranslation?"User Id":"ID de usuario"}</label>
              <input
                type="text"
                placeholder="uid"
                name="uid"
                className="input"
                onChange={(e) => setCustomerUid(e.target.value)}
              />
            </div>
            <button>{!spanishTranslation?"Assign Project to Yourself":"Asignar proyecto a sí mismo"}</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p>{!spanishTranslation?"You must be a manager to assign a project to yourself":"Debe ser gerente para asignarse un proyecto a sí mismo"}</p>
        </div>
      );
    }
  }
}

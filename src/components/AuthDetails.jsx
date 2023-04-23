import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import ManagerProjects from "./MangerProjects";

//used youtube video for authentication https://www.youtube.com/watch?v=Vv_Oi7zPPTw

const AuthDetails = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const [uid, setUid] = useState("");
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [showProfile, setShowProfile] = useState(false);
  const spanishTranslation = props.spaTranslation;
  let navigate = useNavigate();

  //Get currently signed in user IF SIGNED IN
  const getUserFromDb = async () => {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `users/${uid}`));
      if (snapshot.exists()) {
        setSignedInUser(snapshot.val());
        localStorage.setItem("user", signedInUser);
      }
    } catch (e) {
      console.log(e);
      console.log("user not found");
    }
  };
  //Listener for authenticated user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUid(user.uid);
      } else {
        setAuthUser(null);
      }
    });
  }, [auth, uid]);

  useEffect(() => {
    if (uid) {
      getUserFromDb();
    }
  }, [uid, signedInUser]);
  //check if a user is currently signed in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setSignedInUser(loggedInUser);
    }
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        localStorage.clear();
        window.location.reload(false);
      })
      .catch((error) => console.log(error));
  };

  const reqInsp = () => {
    navigate("/requestInspection");
  };

  // Get Currently Signed In User's information!!
  // TODO: Find userType of signed in user ONLY CHECK MANAGER BECAUSE WORKER CUSTOMER PERMS DONT MATTER
  // TODO: Create userType specific elements

  return (
    <div>
      {authUser ? (
        <>
          {!spanishTranslation ? (
            <p>Welcome back!</p>
          ) : (
            <p>¡Bievenido de Nuevo!</p>
          )}
          {signedInUser && signedInUser.userType === "manager" ? (
            <button className="btn-norm" onClick={reqInsp}>
              {!spanishTranslation
                ? "Request an Inspection"
                : "Solicitar una inspección"}
            </button>
          ) : (
            <> </>
          )}
          <br />
          <br />
          {showProfile ? (
            <button
              className="btn-norm"
              onClick={() => setShowProfile(!showProfile)}
            >
              {!spanishTranslation
                ? "Hide User Information"
                : "Ocultar información del usuario"}
            </button>
          ) : (
            <button
              className="btn-norm"
              onClick={() => setShowProfile(!showProfile)}
            >
              {!spanishTranslation
                ? "Show User Information"
                : "Mostrar información del usuario"}
            </button>
          )}
          {showProfile && signedInUser && (
            <>
              <div className="profile-container">
                <table>
                  <tbody>
                    <tr>
                      <td>{!spanishTranslation ? "Name" : "Nombre"}</td>
                      <td>:</td>
                      <td>
                        {signedInUser.firstName} {signedInUser.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {!spanishTranslation ? "Email" : "Correo electrónico"}
                      </td>
                      <td>:</td>
                      <td>{signedInUser.email}</td>
                    </tr>
                    <tr>
                      <td>
                        {!spanishTranslation ? "Role" : "Tipo de usuario"}
                      </td>
                      <td>:</td>
                      <td>{signedInUser.userType}</td>
                    </tr>
                    <tr>
                      <td>{!spanishTranslation ? "Step" : "Paso"}</td>
                      <td>:</td>
                      <td>{signedInUser.step}</td>
                    </tr>
                    {signedInUser.userType === "manager" && (
                      <tr>
                        <td>
                          {!spanishTranslation ? "Projects" : "Proyectos"}
                        </td>
                        <td>:</td>
                        <td>
                          <ManagerProjects
                            spaTranslation={spanishTranslation}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <br />
          <button className="btn-norm" onClick={userSignOut}>
            {!spanishTranslation ? "Sign Out" : "Cerrar sesión"}
          </button>
        </>
      ) : (
        <>
          <p>
            {!spanishTranslation
              ? "You are currently not signed in."
              : "No has iniciado sesión"}
          </p>
          <a className="link-button" href="/login">
            {!spanishTranslation
              ? "Would you like to sign in? Click here."
              : "¿Quiere iniciar sesión?"}
          </a>
        </>
      )}
    </div>
  );
};

export default AuthDetails;

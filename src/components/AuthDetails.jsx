import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import ManagerProjects from "./MangerProjects";

//used youtube video for authentication https://www.youtube.com/watch?v=Vv_Oi7zPPTw

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [uid, setUid] = useState("");
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [showProfile, setShowProfile] = useState(false);
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
          <p>Welcome back!</p>
          {signedInUser && signedInUser.userType === "manager" ? (
            <button onClick={reqInsp}>Request an Inspection</button>
          ) : (
            <> </>
          )}
          <br />
          <br/>
          {showProfile ? (
            <button onClick={() => setShowProfile(!showProfile)}>
              Hide User Information
            </button>
          ) : (
            <button onClick={() => setShowProfile(!showProfile)}>
              Show User Information
            </button>
          )}
          {showProfile && signedInUser && (
            <>
              <div className="profile-container">
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>:</td>
                      <td>
                        {signedInUser.firstName} {signedInUser.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>{signedInUser.email}</td>
                    </tr>
                    <tr>
                      <td>Role</td>
                      <td>:</td>
                      <td>{signedInUser.userType}</td>
                    </tr>
                    <tr>
                      <td>Step</td>
                      <td>:</td>
                      <td>{signedInUser.step}</td>
                    </tr>
                    {signedInUser.userType === 'manager' && 
                      <tr>
                        <td>Projects</td>
                        <td>:</td>
                        <td><ManagerProjects /></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </>
          )}
          <br/>
          <br />
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <p>You are currently not signed in.</p>
          <a className="link-button" href="/login">
            Would you like to sign in? Click here.
          </a>
        </>
      )}
    </div>
  );
};

export default AuthDetails;

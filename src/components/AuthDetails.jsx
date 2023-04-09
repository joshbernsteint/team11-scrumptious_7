import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getDatabase, ref, child, get, update } from "firebase/database";

//used youtube video for authentication https://www.youtube.com/watch?v=Vv_Oi7zPPTw

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [uid, setUid] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUid(user.uid);
      } else {
        setAuthUser(null);
      }
    });

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if(snapshot.exists()){
            setUserType(snapshot.val().userType)
        } else {
            console.log("User not found")
        }
    }).catch((error) => {
        console.log(error);
    })

    return () => {
      listen();
    };
  }, []);



  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
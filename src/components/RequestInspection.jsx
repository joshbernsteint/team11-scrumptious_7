import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import '../App.css'

const RequestInspection = () => {
  //Variables for User Information
  const [authUser, setAuthUser] = useState(null);
  const [uid, setUid] = useState("");
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [isManager, setIsManager] = useState(false);
  // Define state variables to store the form data
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Send form data to server OR send as an email
  };

  // TODO: Get currently signed in user
  const getUserFromDb = async () => {
        const dbRef = ref(getDatabase());
            try{
                const snapshot = await get(child(dbRef, `users/${uid}`));
                    if(snapshot.exists()) {
                        setSignedInUser(snapshot.val())
                        localStorage.setItem('user', signedInUser)
                }
            } catch(e) {
                    console.log(e);
                    console.log("user not found")
            }
      }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
          setUid(user.uid);
        } else {
          setAuthUser(null);
        }
      });
    }, [auth, uid])

    useEffect(() => {
      if (uid) {
          getUserFromDb();
      }
    }, [uid, signedInUser])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          setSignedInUser(loggedInUser);
        }
      }, []);
  // TODO: Find userType of signed in user
  // TODO: Do not render form if not manager



  // Render the form
  return (
  <div>
  {authUser ? (
  <form className='form' onSubmit={handleSubmit}>
      <h3 className="inspectionHeader">Send an Inspection Request</h3>
      {signedInUser.userType==="manager" ?
      (
      <div className='form-body'>
        <label className = "label">
          Email:
          <input type="email"
          className="input"
          placeholder="example@mywebsite.com"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label className = "label">
          Address:
          <input type="text"
          className='input'
          placeholder="Enter the project address"
          value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label className = "label">
          Inspection Type:
          <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">--Select--</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Structural">Structural</option>
          </select>
        </label>
        <br />
        <label className = "label">
          Date: <br />
          <input classname="input"
          type="date"
          value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
        </div>
        ) : (
        <>
        <div className="form-body">
            <p className="label">You do not have permissions for this page.</p>
            <a className="link-button" href="/">Click here to go back to your tasks dashboard.</a>
        </div>
        </>
        )}
      </form>
     ) : ( <a className="link-button" href="/login">Click here to login.</a> )
     }
     </div>
  );
}
export default RequestInspection;

//{signedInUser.userType==="manager" ? <p>manager</p> : <p>not a manager</p>}
//<p>You do not have permissions for this page.</p>
//<a className="link-button" href="/">Click here to go back to your tasks dashboard.</a>
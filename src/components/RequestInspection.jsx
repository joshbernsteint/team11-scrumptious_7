import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import emailjs from "@emailjs/browser";
import '../App.css'

const RequestInspection = (props) => {
  //Variables for User Information
  const [authUser, setAuthUser] = useState(null);
  const [uid, setUid] = useState("");
  const [signedInUser, setSignedInUser] = useState(undefined);
  //Variables to store the form data
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  //Variable for sending emails
  const [msg, setMsg] = useState("");
  const [toSend, setToSend] = useState({
      from_name: '',
      to_name: '',
      message: '',
      reply_to: '',
    });

  const spanishTranslation = props.spaTranslation;
  // Define a function to handle form value changes
  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  }

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to server OR send as an email
    //have email, address, type of inspection, date
    //make an email that: requests a(n) TYPE inspection at ADDRESS on DATE.
    if (!address) {return;}
    if (!email) {return;}
    if (!type) {return;}
    if (!date) {return;}

    if (type !== "Electrical") {
        setMsg("Requesting a " + type + " inspection for a project site at " + address + " on " + date
                                             + ". Let us know when what time you are available.");
    } else {
        setMsg("Requesting an " + type + " inspection for a project site at " + address + " on " + date
            + ". Let us know what time you are available.");
    }

    if (!msg) {return;}
    emailjs.send(
      'service_irz0jpj',
      'template_00t2vd7',
      {
         to_email: email,
         message: msg,
         from_name: signedInUser.firstName + " " + signedInUser.lastName,
      },
      'efzfTDu4C32h1a2WF'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
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



  // Render the form
  return (
  <div className = "inspection-container">
  {authUser ? (
  <form className='form' onSubmit={handleSubmit}>
      <h3 className="inspectionHeader">{!spanishTranslation?"Send an Inspection Request":"Enviar una solicitud de inspección"}</h3>
      {signedInUser && signedInUser.userType==="manager" ?
      (
      <div className='form-body'>
          <input type="email"
          className="input"
          placeholder="Email to send request"
          value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text"
          className='input'
          placeholder="Enter the project address"
          value={address} onChange={(e) => setAddress(e.target.value)} />
        <div>
        <label className = "label">
          {!spanishTranslation?"Inspection Type:":"Tipo de inspección"}
          <select className = "input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">{!spanishTranslation?"-- Select --":"-- Elige --"}</option>
            <option value="Electrical">{!spanishTranslation?"Electrical":"Eléctrica"}</option>
            <option value="Plumbing">{!spanishTranslation?"Plumbing":"Plomería"}</option>
            <option value="Structural">{!spanishTranslation?"Structural":"Estructural"}</option>
          </select>
        </label>
        </div>
        <label className = "label">
          {!spanishTranslation?"Date:":"Fecha:"} <br />
          <input className="input"
          type="date"
          value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <br />
        <button type="submit">{!spanishTranslation?"Submit":"Enviar"}</button>
        </div>
        ) : (
        <>
        <div className="form-body">
            <p className="label">{!spanishTranslation?"You do not have permissions for this page.":"No tienes permiso de acceso a esta pagina"}</p>
            <a className="link-button" href="/">{!spanishTranslation?"Click here to go back to your tasks dashboard.":"Regresar a la pagina de inicio"}</a>
        </div>
        </>
        )}
      </form>
     ) : ( <a className="link-button" href="/login">{!spanishTranslation?"Click here to login":"Haga clic aquí para iniciar sesión"}.</a> )
     }
     </div>
  );
}
export default RequestInspection;
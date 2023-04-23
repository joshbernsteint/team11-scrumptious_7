import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthDetails from "./AuthDetails";
import "../App.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const spanishTranslation = props.spaTranslation;

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={signIn}>
        <div className="form-body">
          <h2 className="inspectionHeader">{!spanishTranslation?"Welcome":"Bienvenido"}</h2>
          <input
            className="input"
            type="email"
            placeholder={!spanishTranslation?"Enter your Email":"Correo eléctronico"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="input"
            type="password"
            placeholder={!spanishTranslation?"Enter your Password":"Contraseña"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">{!spanishTranslation?"Sign In":"Iniciar sesión"}</button>
        </div>
      </form>
      <a className="link-button" href="/login/register">
        {!spanishTranslation?"Not already a user? Register an account here.":"Regístrese aquí si no tiene una cuenta con nosotros."}
      </a>
      <AuthDetails spaTranslation={props.spaTranslation}/>
    </div>
  );
}

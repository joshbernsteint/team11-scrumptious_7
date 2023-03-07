import React, {useState} from 'react';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from "firebase/auth"
import '../App.css'

//used youtube video for authentication https://www.youtube.com/watch?v=Vv_Oi7zPPTw

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setMessage("Success!")
            }).catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='login-container'>
            {message && <p>{message}</p>}
            <form className='form' onSubmit={signIn}>
                <div className='form-body'>
                    <h2>Sign In</h2>
                    <input
                        className='input'
                        type='email'
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input
                        className='input'
                        type='password'
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button type="submit">Sign In</button>
                </div>
            </form>
            <a className="link-button" href="#">Not already a user? Register an account here.</a>
        </div>
    );
};
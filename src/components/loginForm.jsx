import React, {useState} from 'react';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from "firebase/auth"
import '../App.css'

//used youtube video https://www.youtube.com/watch?v=Vv_Oi7zPPTw

export default function Login (props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='login-container'>
            <form className='form' onSubmit={signIn}>
                <div className='form-body'>
                    <h1 className='h1-signIn'>Sign In</h1>
                    <input
                        type='email'
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input
                        type='password'
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button type="submit">Sign In</button>
                </div>
            </form>
            <a href="/register">Not already a user? Register an account here.</a>
        </div>
    );
};
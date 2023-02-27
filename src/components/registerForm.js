import React, {useState} from 'react';

//followed a tutorial at https://www.section.io/engineering-education/registration-form-react.js-firebase/ to learn how to create this registration form

import {database} from '../firebase'
import {ref,push,child,update} from "firebase/database";

function RegisterForm() {

    //for setting the value of the parameters of a user 
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [username, updateUsername] = useState("");
    const [userType, updateUserType] = useState("");
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [passwordConfirm, updatePasswordConfirm] = useState("");

    //handles when an input in the form changes
    const input = (event) => {
        if(event.target.id === "firstName"){
            updateFirstName(event.target.value);
        } else if(event.target.id === "lastName"){
            updateLastName(event.target.value);
        } else if(event.target.id === "username"){
            updateUsername(event.target.value);
        } else if (event.target.id === "userType"){
            updateUserType(event.target.value);
        }else if(event.target.id === "email"){
            updateEmail(event.target.value);
        } else if(event.target.id === "password"){
            updatePassword(event.target.value);
        } else if(event.target.id === "passwordConfirm"){
            updatePasswordConfirm(event.target.value);
        }
    }

    //called once register button is pressed, return the newly created user
    const register  = () => {
        let user = {
            firstName : firstName,
            lastName:lastName,
            usename: username,
            userType: userType,
            email:email,
            password:password,
            passwordConfirm:passwordConfirm,
        }

        //set the form back to empty
        updateFirstName("");
        updateLastName("");
        updateUsername("");
        updateUserType("");
        updateEmail("");
        updatePassword("");
        updatePasswordConfirm("");

        const newPostKey = push(child(ref(database), 'posts')).key;
        const updates = {};
        updates['/' + newPostKey] = user;
        return update(ref(database), updates); 
    }

    return (
        <div className="form">
          <div className="form-body">
              <div>
                  <label>First Name</label>
                  <input type="text" value={firstName} onChange = {(e) => input(e)} id="firstName" placeholder="First Name"/>
              </div>
              <div>
                  <label>Last Name</label>
                  <input  type="text" id="lastName" value={lastName} onChange = {(event) => input(event)} placeholder="Last Name"/>
              </div>
              <div>
                  <label>Username</label>
                  <input type="text" id="username" value={username} onChange = {(e) => input(e)} placeholder="Username"/>
              </div>
              <div>
                  <label>User Classification </label>
                  <input  type="text" id="userType" value={userType} onChange = {(event) => input(event)} placeholder="User Classification"/>
              </div>
              <div>
                  <label>Email </label>
                  <input  type="email" id="email" className="form__input" value={email} onChange = {(event) => input(event)} placeholder="Email"/>
              </div>
              <div>
                  <label>Password </label>
                  <input type="password"  id="password" value={password} onChange = {(event) => input(event)} placeholder="Password"/>
              </div>
              <div>
                  <label>Confirm Password </label>
                  <input type="password" id="passwordConfirm" value={passwordConfirm} onChange = {(event) => input(event)} placeholder="Confirm Password"/>
              </div>
          </div>
          <div className="footer">
                <button type="submit" onClick={()=>register()}>Register</button>
            </div>
      </div>
    )
}

export default RegisterForm;
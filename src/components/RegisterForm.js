import React, {useState} from 'react';
import '../App.css'
import {auth} from '../firebase';
import {ref, set, getDatabase} from "firebase/database";
import {createUserWithEmailAndPassword } from 'firebase/auth';
var CryptoJS = require("crypto-js");

export default function RegisterForm(props) {
    const [user, setUser] = useState(
        {
            firstName: "", 
            lastName: "", 
            userType:  "",
            email: "", 
            password: "", 
            passwordConfirm: ""}
    );
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const spanishTranslation = props.spaTranslation;
    function handleChange(event){
        const {name, value} = event.target
        setUser(prevUserData => {
            return {
                ...prevUserData,
                [name]: value
            }
        })
    }

    function handleRegister(event){
        if(Object.keys(validate(user)).length !== 0){
            event.preventDefault();
            setErrors(validate(user));
        } else {
            errors.firstName = "";
            errors.lastName = "";
            errors.userType = "";
            errors.email = "";
            errors.password = "";
            errors.passwordConfirm = "";
            event.preventDefault();
            let obj = {};
            obj.firstName = user.firstName;
            obj.lastName = user.lastName;
            obj.userType = user.userType;
            obj.email = user.email;

            const secretPass = "secretKey";

            createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            ).then((userCredential) => {
                let msg;
                if(!spanishTranslation){
                    msg = "Success!"
                }else{
                    msg = "¡Realizado!"
                }
                setMessage(msg)
                obj.password = CryptoJS.AES.encrypt(
                JSON.stringify(user.password),
                secretPass
                ).toString();
                let temp = {
                firstName: "",
                lastName: "",
                userType: "",
                email: "",
                password: "",
                passwordConfirm: "",
                };
                setUser(temp);
                /*
                    decrypt password:
                    var bytes = CryptoJS.AES.decrypt(obj.password, secretPass);
                    var decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                */

                return writeUserData(obj.firstName, obj.lastName, obj.userType, obj.email, obj.password, userCredential.user.uid)
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    function writeUserData(firstName, lastName, userType, email, password, uid){
        const db = getDatabase();
        set(ref(db, 'users/' + uid), {
            firstName: firstName, 
            lastName: lastName,
            userType: userType,
            email: email,
            password: password,
            uid: uid,
            step: 1,
            projectManager: ''
        })
    }

    const validate = (values) => {
        const errors = {};

        //error chack first name input
        let nameType;
        if(!spanishTranslation){
            nameType = "First"
        }else{
            nameType = "Nombre"
        }
        let firstNameCheck = checkName(user.firstName, nameType);
        if(firstNameCheck !== ""){
            errors.firstName = firstNameCheck;
        }

        //error check last name input
        if(!spanishTranslation){
            nameType = "Last"
        }else{
            nameType = "Apellido"
        }
        let lastNameCheck = checkName(user.lastName, nameType);
        if(lastNameCheck !== ""){
            errors.lastName = lastNameCheck;
        }

        //error check user classification input
        let userTypeCheck = checkUserType(user.userType);
        if(userTypeCheck !== ""){
            errors.userType = userTypeCheck;
        }

        //error check email input
        let emailCheck = checkEmail(user.email);
        if(emailCheck !== ""){
            errors.email = emailCheck;
        }

        //error check password input
        let passwordCheck = checkPassword(user.password);
        if(passwordCheck !== ""){
            errors.password = passwordCheck;
        }

        //error check password confirmation
        if(user.passwordConfirm !== user.password){
            if(!spanishTranslation){
                errors.passwordConfirm = "Password confirmation does not match password";
            }else{
                errors.passwordConfirm = "La confirmación de contraseña no coincide con la contraseña"
            }
        }
        return errors;
    }

    function checkName(name, nameType) {
        let valid_characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        if(!name){
            let msg;
            if(!spanishTranslation){
                msg = nameType + " name is required!";
            }else{
                msg = nameType + " es requerido"
            }
            return msg
        }
        if(name.length < 2){
            let msg;
            if(!spanishTranslation){
                msg = nameType + " name must be at least 2 characters long"
            }else{
                msg = nameType + " debe tener al menos 2 caracteres"
            }
            return msg
        }
        let temp = name.toLowerCase()
        for(let i = 0; i <temp.length; i++){
            if(!valid_characters.includes(temp[i])){
                let msg;
                if(!spanishTranslation){
                    msg = nameType + " name must only contain letters";
                }else{
                    msg = nameType + " solo debe contener letras"
                }
                return msg;
            }
        }
        return ""
    }

    function checkUserType(userType){
        if(userType === ""){
            let msg;
            if(!spanishTranslation){
                msg = "You must choose Customer, Construction Worker, or Manager";
            }else{
                msg = "Debe elegir Cliente, Trabajador de la construcción o Gerente";
            }
            return msg;
        }
        return "";
    }

    function checkEmail(email){
        if(!email){
            let msg;
            if(!spanishTranslation){
                msg = "Email is required!"
            }else{
                msg = "Correo electrónico es requerido"
            }
            return msg;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!regex.test(email)){
            let msg;
            if(!spanishTranslation){
                msg = "This is not a valid email"
            }else{
                msg = "El correo electrónico es invalido"
            }
            return msg;
        }
        return "";
    }

    function checkPassword(password){
        if(!password){
            let msg;
            if(!spanishTranslation){
                msg = "Password must be provided!"
            }else{
                msg = "Una contraseña es requerida"
            }
            return msg
        }
        if(password.length < 6){
            let msg;
            if(!spanishTranslation){
                msg ="Password must be at least 6 characters long"
            }else{
                msg = "La contraseña debe contener 6 caracteres como mínimo"
            }
            return msg;
        }

        let valid_lower_characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        let valid_upper_characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let valid_nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        let valid_special_characters = ['$', '&', '%', '#', '*', '@', '!', '(', ')', ':'];

        let has_lower = false;
        let has_upper = false;
        let has_num = false;  
        let has_special = false; 
        
        for(let i = 0; i < password.length; i++){
            if(valid_lower_characters.includes(password[i])){
                has_lower = true;
            } else if(valid_nums.includes(password[i])){
                has_num = true;
            } else if(valid_upper_characters.includes(password[i])){
                has_upper = true;
            } else if(valid_special_characters.includes(password[i])){
                has_special = true;
            } else {
                let msg;
                if(!spanishTranslation){
                    msg = "Invalid character in password"
                }else{
                    msg = "Carácter no válido en la contraseña"
                }
                return msg;
            }
        }

        if(!has_lower){
            let msg;
                if(!spanishTranslation){
                    msg = "Password must contain at least one lowercase character";
                }else{
                    msg = "La contraseña debe contener al menos una letra minúscula"
                }
                return msg;
        }

        if(!has_upper){
            let msg;
                if(!spanishTranslation){
                    msg = "Password must contain at least one uppercase character"
                }else{
                    msg = "La contraseña debe contener al menos una letra mayúscula"
                }
                return msg;
        }

        if(!has_num){
            let msg;
                if(!spanishTranslation){
                    msg = "Password must contain at least one number"
                }else{
                    msg = "La contraseña debe contener al menos un número"
                }
                return msg;
        }

        if(!has_special){
            let msg;
                if(!spanishTranslation){
                    msg = "Password must contain at least one special character"
                }else{
                    msg = "La contraseña debe contener al menos un carácter especial"
                }
                return msg;
        }

        return "";
    }

    return (
        <div className='register-container'>
            {message && <p aria-label='message'>{message}</p>}
            <form onSubmit={handleRegister} className="form" aria-label="register a user">
                <div>
                    <label className='label'>{!spanishTranslation?"First Name":"Nombre"}</label>
                    {errors.firstName && <p className='error' aria-label="first-name-error">{errors.firstName}</p>}
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={handleChange}
                        name="firstName"
                        aria-label='first-name'
                        value={user.firstName}
                        className='input'
                    />
                </div>
                <div>
                    <label className='label'>{!spanishTranslation?"Last Name":"Apellido"}</label>
                    {errors.lastName && <p className='error' aria-label="last-name-error">{errors.lastName}</p>}
                    <input
                        type="text"
                        aria-label='last-name'
                        placeholder="Last Name"
                        onChange={handleChange}
                        name="lastName"
                        value={user.lastName}
                        className='input'
                    />
                </div> 
                <div>
                    <label className='label'>{!spanishTranslation?"User Classification":"Clasificación del usuario"} </label>
                    {errors.userType && <p className='error' aria-label="user-type-error">{errors.userType}</p>}
                    <select 
                        aria-label='user-type'
                        id="userType"
                        value={user.userType}
                        onChange={handleChange}
                        name="userType"
                        className='input'
                    >
                        <option value="">{!spanishTranslation?"-- Choose --":"-- Elige --"}</option>
                        <option value="customer">{!spanishTranslation?"Customer":"Cliente"}</option>
                        <option value="worker">{!spanishTranslation?"Construction Worker":"Trabajador de la construcción"}</option>
                        <option value="sales-rep">{!spanishTranslation?"Sales Representative":"Representante de ventas"}</option>
                        <option value="manager">{!spanishTranslation?"Manager":"Gerente"}</option>
                    </select>
                </div>
                <div>
                    <label className='label'>{!spanishTranslation?"Email":"Correo electrónico"}</label>
                    {errors.email && <p className='error' aria-label="email-error">{errors.email}</p>}
                    <input
                        type="email"
                        aria-label='email'
                        placeholder="Email"
                        onChange={handleChange}
                        name="email"
                        value={user.email}
                        className='input'
                    />
                </div>
                <div>
                    <label className='label'>{!spanishTranslation?"Password":"Contraseña"} </label>
                    {errors.password && <p className='error' aria-label="password-error">{errors.password}</p>}
                    <input
                        type="password"
                        aria-label='password'
                        placeholder="Password"
                        onChange={handleChange}
                        name="password"
                        value={user.password}
                        className='input'
                    />
                </div>
                    <div>
                    <label className='label'>{!spanishTranslation?"Confirm Password":"Confirmar contraseña"} </label>
                    {errors.passwordConfirm && <p className='error' aria-label="password-confirm-error">{errors.passwordConfirm}</p>}
                    <input
                        type="password"
                        aria-label='password-confirm'
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        name="passwordConfirm"
                        value={user.passwordConfirm}
                        className='input'
                    />
                </div>
                <button>{!spanishTranslation?"Register":"Regístrar"}</button>
            </form>
            <a href="/login">{!spanishTranslation?"Already have an account? Sign in here":"¿Ya tienes una cuenta? Inicia sesión aquí"}</a>
        </div>
    )
}
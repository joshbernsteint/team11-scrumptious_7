import React, {useRef} from 'react';
import '../App.css';
import emailjs from '@emailjs/browser';

function EmailChain() {

    const clickHandler =  () => {
    const user1 = {name: "Jasmine", email: "jperez11@stevens.edu"}
    const getAllContacts = [user1]
    getAllContacts.map((user)=>{
        sendEmail(user)
    })
    }
    //need to check that user is signed in
    const sendEmail = (user) => {
    emailjs.send('service_mwt8t37', 'template_2xeuico', {to_name: user.name, to_email: user.email, message: "testing", from_name: 'Management Team'}, 'PkhGQLnUZHu0EHURj')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    }
  return (
    <div>
    <button className='eml-btn' onClick={clickHandler}>Send to Email Chain</button>
    </div>
  );
}

export default EmailChain;

import React, {useState} from 'react';
import { send } from 'emailjs-com';
import '../App.css';
function PermissionForm(props){
    const spanishTranslation = props.spaTranslation;
    const [toSend, setToSend] = useState({
        sender: '',
        receiver: '',
        message: '',
        reply_to: '',
      });

    const handleChange = (e, name) => {
        setToSend((prevToSend) => ({
          ...prevToSend,
          [name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        send(
          'SERVICE ID',
          'TEMPLATE ID',
          toSend,
          'User ID'
        )
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
          })
          .catch((err) => {
            console.log('FAILED...', err);
          });
      };

    return (
      <div className="image-container">
              <form className="form" onSubmit={onSubmit}>{}
              <h2 className="inspectionHeader">{!spanishTranslation?"Send a Permission Request":"Enviar una solicitud de Permiso"}</h2>
              <div className="form-body">
                  <label className="label">
                  {!spanishTranslation?"Sender":"Remitente"}:
                  </label><br/>
                  <input className="input" type='text' placeholder="Email to send request from" value={toSend.sender} required onChange={(e)=>
                      handleChange(e, 'sender')} /><br/>
                  <label className="label">
                  {!spanishTranslation?"Receiver":"Destinatario"}:
                  </label><br/>
                  <input className="input" type='text' placeholder="Email to send request" value={toSend.receiver} required onChange={(e)=>
                      handleChange(e, 'receiver')} /><br/>
                  <label className="label">
                  {!spanishTranslation?"Message":"Mensaje"}:
                  </label><br/>
                  <input className="input" type='text' placeholder="Enter the message for your email" value={toSend.message} required onChange={(e)=>
                      handleChange(e, 'message')} /><br/>
                  <label className="label">
                  {!spanishTranslation?"Reply To":"Responder a"}:
                  </label><br/>
                  <input className="input" type='text' placeholder="Enter the email to reply to" value={toSend.reply_to} required onChange={(e)=>
                      handleChange(e, 'reply_to')} /><br/>
                  <button type='submit' aria-label="send_email_button">{!spanishTranslation?"Send Email":"Enviar correo eléctronico"}</button>
                  <button className="form-btn" type='submit'>{!spanishTranslation?"Send Email":"Enviar correo eléctronico"}</button>
              </div>
              </form>
      </div>
    )
}

export default PermissionForm;
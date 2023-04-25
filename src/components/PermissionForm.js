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
              <label className="label"/>
            </div>
          </form>
          <div className="App">
            <header className="App">
            <form onSubmit={onSubmit}>{}
              <h2>{!spanishTranslation?"Request Permission":"Solicitar Permiso"}</h2>
              <label >
                {!spanishTranslation?"Sender":"Remitente"}:
              </label><br/>
                <input className="input" type='text' placeholder={!spanishTranslation?"Sender's email":"Correo eléctronico del remitente"} value={toSend.sender} required onChange={(e)=>
                  handleChange(e, 'sender')} /><br/>
              <label className="label">
               {!spanishTranslation?"Receiver":"Destinatario"}:
              </label><br/>
                <input className="input" type='text' placeholder={!spanishTranslation?"Email to send request to":"Correo eléctronico del destinatario"} value={toSend.receiver} required onChange={(e)=>
                  handleChange(e, 'receiver')} /><br/>
              <label className="label">
               {!spanishTranslation?"Message":"Mensaje"}:
              </label><br/>
                <input className="input" type='text' placeholder={!spanishTranslation?"Enter the message for your email":"Mensaje"} value={toSend.message} required onChange={(e)=>
                  handleChange(e, 'message')} /><br/>
              <label className="label">
                {!spanishTranslation?"Reply To":"Responder a"}:
              </label><br/>
                <input className="input" type='text' placeholder={!spanishTranslation?"Enter the email to reply to":"Ingrese el correo electronico para responder"} value={toSend.reply_to} required onChange={(e)=>
                  handleChange(e, 'reply_to')} /><br/>
              <button className="form-btn" type='submit'>{!spanishTranslation?"Send Email":"Enviar correo eléctronico"}</button>        
            </form>
            </header>
                </div>
        </div>

      
    )
}

export default PermissionForm;
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
        <div className="App">
            <header className="App-header">
                <form onSubmit={onSubmit}>{}
                <h2>{!spanishTranslation?"Request Permission":"Solicitar Permiso"}</h2>
                    <label >
                    {!spanishTranslation?"Sender":"Remitente"}:
                    </label><br/>
                    <input type='text' value={toSend.sender} required onChange={(e)=> 
                        handleChange(e, 'sender')} /><br/>
                    <label >
                    {!spanishTranslation?"Receiver":"Destinatario"}:
                    </label><br/>
                    <input type='text' value={toSend.receiver} required onChange={(e)=> 
                        handleChange(e, 'receiver')} /><br/>
                    <label>
                    {!spanishTranslation?"Message":"Mensaje"}:
                    </label><br/>
                    <input type='text' value={toSend.message} required onChange={(e)=> 
                        handleChange(e, 'message')} /><br/>
                    <label >
                    {!spanishTranslation?"Reply To":"Responder a"}:
                    </label><br/>
                    <input type='text' value={toSend.reply_to} required onChange={(e)=> 
                        handleChange(e, 'reply_to')} /><br/>
                    <button type='submit'>{!spanishTranslation?"Send Email":"Enviar correo eléctronico"}</button>
                </form>
            </header>
        </div>
    )
}

export default PermissionForm;
import React, {useState} from 'react';
import { send } from 'emailjs-com';
import '../App.css';
function PermissionForm(){
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
                <h2>Request Permission</h2>
                    <label >
                    Sender:
                    </label><br/>
                    <input type='text' value={toSend.sender} required onChange={(e)=> 
                        handleChange(e, 'sender')} /><br/>
                    <label >
                    Receiver:
                    </label><br/>
                    <input type='text' value={toSend.receiver} required onChange={(e)=> 
                        handleChange(e, 'receiver')} /><br/>
                    <label>
                    Message:
                    </label><br/>
                    <input type='text' value={toSend.message} required onChange={(e)=> 
                        handleChange(e, 'message')} /><br/>
                    <label >
                    Reply To:
                    </label><br/>
                    <input type='text' value={toSend.reply_to} required onChange={(e)=> 
                        handleChange(e, 'reply_to')} /><br/>
                    <button type='submit'>Send Email</button>
                </form>
            </header>
        </div>
    )
}

export default PermissionForm;
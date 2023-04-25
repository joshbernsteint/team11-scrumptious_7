import React, {useState} from 'react';
export default function SendContract() {
	
	function checkEmail(email){
        if(!email){
            return "Email is required!";
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!regex.test(email)){
            return "This is not a valid email";
        }
        return "";
    }
	
	function sendContract(event){
		return;
	}

    return (
        <form onSubmit={sendContract} className="form">
            <div className='form-body'>
				<div>
					<label className='label'>Upload Contract</label>
					<input type="file" name="upload" accept="application/pdf" />
				</div>
				<div>
					<label className='label'>Signers Email</label>
					<p className='error'>{/*errors.email*/}</p>
					<input
						type="text"
						placeholder="Email"
						name="signersEmail"
						//value={user.lastName}
						className='input'
					/>
				</div>
				<div>
					<button>Send Contract</button>
				</div>
			</div>
		</form>
    )
}
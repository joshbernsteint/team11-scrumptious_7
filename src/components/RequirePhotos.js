import React, {useState} from 'react';
import axios from 'axios';
import '../App.css';

function RequirePhotos(props){
    const[file, setFile] = useState()
    const spanishTranslation = props.spaTranslation;
    function handleChange(event){
        setFile(event.target.files[0])
    }

    function handleSubmit(event){
        event.preventDefault()
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
          axios.post(url, formData, config).then((response) => {
            console.log(response.data);
          });
    }

    return (
        <div className="image-container">
            <form className="form" onSubmit={handleSubmit}>
            <h2 className="inspectionHeader">{!spanishTranslation?"Image Upload":"Subir Imagen"}</h2>
                <div className="form-body">
                    <input className="input" required type="file" onChange={handleChange}/>
                    <button className="form-btn" type="submit">{!spanishTranslation?"Upload":"Subir"}</button>
                </div>
            </form>
        </div>
      );
}

export default RequirePhotos;
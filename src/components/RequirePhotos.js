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
        <div className="App">
            <form onSubmit={handleSubmit}>
              <h1>{!spanishTranslation?"Image Upload":"Subir Imagen"}</h1>
              <input required type="file" onChange={handleChange}/>
              <button type="submit">{!spanishTranslation?"Upload":"Subir"}</button>
            </form>
        </div>
      );
}

export default RequirePhotos;
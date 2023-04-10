import React, {useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailChain from "./EmailChain";
import '../App.css';
import { 
    CardActionArea,
    CardActions,
    Grid,} from '@mui/material';
function PermissionForm(){
    const[name, setName] = useState('');
    const[role, setRole] = useState('');
    const[email, setEmail] = useState('');

    const handleNameChange =(e)=>{
        setName(e.target.value);
    }

    const handleRoleChange =(e)=>{
        setRole(e.target.value);
    }

    const handleEmailChange =(e)=>{
        setEmail(e.target.value);
    }

    const handleSubmit=(e)=>{
        alert('A form was submitted with Name :"' + name +'" ,Role :"'+ role +'" and Email :"' + email + '"');
    }

    return (
        <div classname="App">
            <header classname="App-header">
                <form onSubmit={(e)=>{handleSubmit(e)}}>{}
                <h2>Request Permission</h2>
                    <Grid>
                    <Card>
                        <CardActionArea>
                            <label >
                            Name:
                            </label><br/>
                            <input type="text" value={name} required onChange={(e)=> 
                                {handleNameChange(e)}} /><br/>
                            <label >
                            Role:
                            </label><br/>
                            <input type="text" value={role} required onChange={(e)=> 
                                {handleRoleChange(e)}} /><br/>
                            <label>
                            Email:
                            </label><br/>
                            <input type="email" value={email} required onChange={(e) => 
                                {handleEmailChange(e)}} /><br/>
                        </CardActionArea>
                        <CardActionArea>
                            <EmailChain></EmailChain>
                        </CardActionArea>
                    </Card>
                    </Grid>
                </form>
            </header>
        </div>
    )
}

export default PermissionForm;
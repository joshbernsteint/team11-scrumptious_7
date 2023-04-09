import React, { useState } from 'react';
import { Text } from 'react';
import '../App.css'

const RequestInspection = () => {
  // Define state variables to store the form data
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Send form data to server OR send as an email
  };

  // TODO: Get currently signed in user
  // TODO: Find userType of signed in user
  // TODO: Do not render form if not manager


  // Render the form
  return (
    <form className='form' onSubmit={handleSubmit}>
    <div className='form-body'>
    <h3 className="inspectionHeader">Send an Inspection Request</h3>
      <label className = "label">
        Email:
        <input type="email"
        className="input"
        placeholder="example@mywebsite.com"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label className = "label">
        Address:
        <input type="text"
        className='input'
        placeholder="Enter the project address"
        value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <br />
      <label className = "label">
        Inspection Type:
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">--Select--</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Structural">Structural</option>
        </select>
      </label>
      <br />
      <label className = "label">
        Date: <br />
        <input classname="input"
        type="date"
        value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <br />
      <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default RequestInspection;
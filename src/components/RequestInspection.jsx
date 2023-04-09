import React, { useState } from 'react';
import { Text } from 'react';
import '../App.css'

const RequestInspection = () => {
  // Define state variables to store the form data
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Send form data to server
  };

  // Define a function to handle changes to the address input
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  // Define a function to handle changes to the type input
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // Define a function to handle changes to the date input
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Render the form
  return (
    <form className='form' onSubmit={handleSubmit}>
    <div className='form-body'>
    <h3 className="inspectionHeader">Request an Inspection</h3>
      <label className = "label">
        Address:
        <input type="text" className='input' value={address} onChange={handleAddressChange} />
      </label>
      <br />
      <label className = "label">
        Inspection Type:
        <select className="input" value={type} onChange={handleTypeChange}>
          <option value="">--Select--</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Structural">Structural</option>
        </select>
      </label>
      <br />
      <label className = "label">
        Date:
        <input classname="input" type="date" value={date} onChange={handleDateChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default RequestInspection;
// components/RegForm.jsx

/* eslint-disable no-undef */

import React, { useState } from 'react';

const RegForm = ({ email, onEmailChange, onSubmit }) => {
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await onSubmit();
      setRegistrationStatus(success);
    } catch (error) {
      console.error('Error during submission:', error);
      setRegistrationStatus(false); // Set status to false if an error occurs
    }
  };

  const containerStyle = {
    marginTop: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '70%', // Adjusted height
  };

  const formStyle = {
    width: '300px',
    height: '100%',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    background: 'linear-gradient(to right, #ada1e6, #605399)',
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0',
    textAlign: 'center',
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '93%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#605399',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '16px',
    display: 'block', // Ensure it's treated as a block element for centering
    margin: '0 auto', // Center horizontally
  };

  const messageStyle = {
    marginTop: '20px',
    textAlign: 'center',
    color: registrationStatus ? 'green' : 'red',
  };

  const descriptionStyle = {
    margin: '10px 0',
    textAlign: 'center',
    color: '#ddd',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>Email Verification</label>
        <p style={descriptionStyle}>We'll send an OTP to your email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          style={inputStyle}
          placeholder="Enter your email"
          aria-label="Email"
        />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>

      {registrationStatus !== null && (
        <div style={messageStyle}>
          {registrationStatus ? 'OTP sent successfully' : 'Error sending OTP'}
        </div>
      )}
    </div>
  );
};

/* eslint-enable no-undef */

export default RegForm;

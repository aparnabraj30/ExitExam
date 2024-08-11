// components/RegForm.jsx

/* eslint-disable no-undef */

import React, { useState } from 'react';

const RegForm = ({ email, onEmailChange, onSubmit }) => {
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit();
    setRegistrationStatus(success);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const formStyle = {
    width: '300px',
    margin: 'auto',
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const messageStyle = {
    marginTop: '20px',
    textAlign: 'center',
    color: registrationStatus ? 'green' : 'red', // Adjust color based on success or failure
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>

      {registrationStatus !== null && (
        <div style={messageStyle}>
          {registrationStatus ? 'OTP Sent successfully' : 'Error sending OTP'}
        </div>
      )}
    </div>
  );
};

/* eslint-enable no-undef */

export default RegForm;

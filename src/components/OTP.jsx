// components/OTP.jsx

import React from 'react';

const OTP = ({ otp, onOtpChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>Enter OTP</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => onOtpChange(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
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

export default OTP;

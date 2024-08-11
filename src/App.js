// App.js

import React, { useState } from 'react';
import RegForm from './components/RegForm';
import OTP from './components/OTP';

const App = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [showOTPForm, setShowOTPForm] = useState(false);

  const handleRegistrationSubmit = async (submittedEmail) => {
    try {
      const response = await fetch('http://localhost:3001/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: submittedEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail(submittedEmail);
        setShowOTPForm(true);
      } else {
        alert('Error sending OTP: ' + data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };

  const handleOTPSubmit = async (submittedOTP) => {
    try {
      const response = await fetch('http://localhost:3001/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: submittedOTP }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('OTP Matched! Redirect to Welcome Page');
      } else {
        alert('Invalid OTP. Try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
    }
  };

  return (
    <div>
      {showOTPForm ? (
        <OTP
          otp={otp}
          onOtpChange={(newOtp) => setOTP(newOtp)}
          onSubmit={() => handleOTPSubmit(otp)}
        />
      ) : (
        <RegForm
          email={email}
          onEmailChange={(newEmail) => setEmail(newEmail)}
          onSubmit={() => handleRegistrationSubmit(email)}
        />
      )}
    </div>
  );

};

export default App;
// Import Firebase and auth module properly
"use strict";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';

const VerifyPhoneComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const setupRecaptcha = () => {
    // Check if recaptchaVerifier is not already set
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible',
        defaultCountry: "vn",
      });
    }
  };

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const handleSendOTP = async () => {
    await firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert('OTP đã được gửi');
      })
      .catch((error) => {
        console.log(error);
        alert('Gửi OTP thất bại');
      });
  };

  const handleVerifyOTP = () => {
    window.confirmationResult
      .confirm(otp)
      .then(() => {
        alert('Xác thực thành công');
      })
      .catch((error) => {
        alert('Xác thực thất bại');
        console.log(error);
      });
  };

  return (
    <div>
      <input type="text" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
      <button onClick={handleSendOTP}>Gửi mã</button>
      <input type="text" value={otp} onChange={(e) => { setOtp(e.target.value) }} />
      <button onClick={handleVerifyOTP}>Xác thực mã</button>
    </div>
  );
};

export default VerifyPhoneComponent;

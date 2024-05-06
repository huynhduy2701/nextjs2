import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBgvvQMDBd5V5BuHmBpfSNlvogoUQApvHM",
  authDomain: "otpnextjs.firebaseapp.com",
  projectId: "otpnextjs",
  storageBucket: "otpnextjs.appspot.com",
  messagingSenderId: "501959292611",
  appId: "1:501959292611:web:a50d1bed6ab795e6889476",
  measurementId: "G-DS4RCWFEKB"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app);
export default app;
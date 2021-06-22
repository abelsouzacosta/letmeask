import firebase from "firebase/app";

// vamos usar os recursos de autenticação e também de banco de dados da aplicação
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA8wKo76R4SoFM5kPpiC0jtpqT3K3Ke9gg",
  authDomain: "letmeask-rocketseat-4f61d.firebaseapp.com",
  databaseURL: "https://letmeask-rocketseat-4f61d-default-rtdb.firebaseio.com",
  projectId: "letmeask-rocketseat-4f61d",
  storageBucket: "letmeask-rocketseat-4f61d.appspot.com",
  messagingSenderId: "299395829463",
  appId: "1:299395829463:web:458f6582041f4094266a92"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();


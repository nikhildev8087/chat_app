
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getDatabase } from "firebase/database";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDCpe1U0Ku3iYunLG5019rX5HsKHnpO_QM",
    authDomain: "chat-app-fa72a.firebaseapp.com",
    projectId: "chat-app-fa72a",
    storageBucket: "chat-app-fa72a.appspot.com",
    messagingSenderId: "332981655043",
    appId: "1:332981655043:web:97b744da3e61828329e036"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const database = getDatabase(app);

  console.log(database);



// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWsYUbtGlThZgIMswWOoUZbahWWyGEJbQ",
    authDomain: "messenger-39c9f.firebaseapp.com",
    projectId: "messenger-39c9f",
    storageBucket: "messenger-39c9f.appspot.com",
    messagingSenderId: "826797455058",
    appId: "1:826797455058:web:23364b50bcd772e4c55f0b"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // console.log(app);
  
  
  
    function entername(){
      const enterusername = document.getElementById('entername');
      const username = enterusername.value;
      console.log(username);
    
    }
  
  
  const db = firebase.database();
  
  const username = prompt("Please Tell Us Your Name");
  console.log(username);
  
  document.getElementById("message-form").addEventListener("submit", sendMessage);
  
  // window.EmojiPicker.init();
  
  
//   const emoji = document.getElementById('message-input');
//   $(emoji).emojioneArea({
//     pickerPosition: "bottom",
//   })
  
  
  
  function sendMessage(e) {
      e.preventDefault();
    
      // get values to be submitted
      const timestamp = Date.now();
      const messageInput = document.getElementById("message-input");
      
      const message = messageInput.value;
      
    console.log(message);
      // clear the input box
      messageInput.value = "";
    
      //auto scroll to bottom
      // document
      //   .getElementById("messages")
      //   .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    
      // create db collection and send in the data
      db.ref("messages/" + timestamp).set({
        username,
        message,
      });
    }
  
  
  
  
    const fetchMessage = db.ref("messages/");
  
  
    fetchMessage.on("child_added", function (snapshot) {
      const messages = snapshot.val();
      const message = `<li class=${
        username === messages.username ? "sent" : "receive"
      }><span>${messages.username}: </span>${messages.message} </li>`;
      // append the message on the page
      document.getElementById("messages").innerHTML += message;
    });
  
    // ***************************************************************************
    
  
    // function sendimage(){
    //   // e.preventDefault();
    //   const messageImg = document.getElementById("message-img").files[0];
    //   // const msgimg = messageImg.value;
    //       console.log(messageImg);
          
    // }
  //  function sendImg(e){
  //   e.preventDefault();
  //   var timestamp = Number(new Date());
  //   var storageRef = firebase.storage().ref(timestamp.toString());
  
  //   var msgim =  document.getElementById('message-img').prop(files)[0];
  //   var file_data = msgim;
  //   console.log(file_data);
  //   storageRef.put(msgim);
  // }
  
  
  const imageBtn = document.getElementById('img-btn');
  
  imageBtn.addEventListener("click", function (e){
    e.preventDefault();
    // let timestamp = Number(new Date());
    let storageRef = firebase.storage().ref(timestamp.toString());
    const msgImg = document.getElementById('message-img');
    let file_data = msgImg.files[0];
    storageRef.put(file_data);
    console.log(file_data.name);


    storageRef.child(file_data.name).getDownloadURL(file_data)
  .then((url) => {
      console.log(url);
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    var img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });


    console.log(file_data.lastModified);
    console.log(file_data);
    msgImg.value = "";
    
    
})
// const geturl = getDownloadURL(file_data.lastModified);
// console.log(geturl);
  
  



let timestamp = Number(new Date());
let storageRef= firebase.storage().ref(timestamp.toString());;

// storageRef.child('1655104491743').getDownloadURL()
//   .then((url) => {
//     // `url` is the download URL for 'images/stars.jpg'

//     // This can be downloaded directly:
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'blob';
//     xhr.onload = (event) => {
//       var blob = xhr.response;
//     };
//     xhr.open('GET', url);
//     xhr.send();

//     // Or inserted into an <img> element
//     var img = document.getElementById('myimg');
//     img.setAttribute('src', url);
//   })
//   .catch((error) => {
//     // Handle any errors
//   });


  
  
//   const allimages = [] ;
//   const setImages = [];
  
//   const getFromFirebase = () =>{
//     let storageRef = storage.ref();
//     storageRef.listAll().then(function res(){
//       res.items.forEach((imageRef)=>{
//         imageRef.getDownloadUrl().then((url)=>{
//           setImages((allimages)=>[...allimages, url]);
//         });
//       });
//     })
//     .catch(function (error){
//       console.log(error);
//     });
//   };
  
//   console.log(allimages);
  
  
  
  
  
  
  //   function gmailsign(){
  //   var provider = new firebase.auth.GoogleAuthProvider();
  
  //   firebase.auth()
  //   .signInWithPopup(provider)
  //   .then((result) => {
  //   console.log(result);
  //   }).catch((error) => {
    
  //   });
  // }
  
  
  async function signup(e){
    e.preventDefault();
    const mailId = document.getElementById('mailid');
    const password = document.getElementById('Password');
    console.log(mailId.value ,password.value);
  
    try{
  
        const result = await firebase.auth().createUserWithEmailAndPassword(mailId.value, mailId.value);
        await result.user.updateProfile({
            displayName: "User"
          })
  
          createUserCollection(result.user);
  
      await result.user.sendEmailVerification()
        console.log(result.user.email);
  
    }catch(error){
        console.log(error);
        
    }
    mailId.value = "";
    password.value = "";
  
  }
  
  
  
  
  async function login(e){
    e.preventDefault();
    const mailId = document.getElementById('lmailid');
    const password = document.getElementById('lPassword');
    console.log(mailId.value, password.value);
  
    try{
  
        const result = await firebase.auth().signInWithEmailAndPassword(mailId.value, password.value);
        console.log(result.user.email);
  
    }catch(error){
        console.log(error);
        
    }
    mailId.value = "";
    password.value = "";
  }
  
  
  function logout(){
    firebase.auth().signOut();
  }
  
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
    } else {
      console.log('signout');
    }
  });
  
  
  
  async function loginWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    try{
  
     const result = await firebase.auth()
      .signInWithPopup(provider)
      console.log(result);
      createUserCollection(result.user);
    }catch(err){
    console.log(err);
    }
  
  }
  
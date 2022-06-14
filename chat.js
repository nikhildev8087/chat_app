
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
 

    function entername(){
      const enterusername = document.getElementById('entername');
      const username = enterusername.value;
      console.log(username);
    
    }
  

  
  const db = firebase.database();
  
  const username = prompt("Please Tell Us Your Name");
  console.log(username);
  
  document.getElementById("message-form").addEventListener("submit", sendMessage);
  
  
  
  function sendMessage(e) {
      e.preventDefault();
    
      // sendimage();
      const url = 'https://firebasestorage.googleapis.com/v0/b/messenger-39c9f.appspot.com/o/images%2F1655189114394?alt=media&token=b10de293-cb1c-4113-bef7-997e83b93962'; 

      // get values to be submitted
      const timestamp = Date.now();
      const messageInput = document.getElementById("message-input");
      
      const message = messageInput.value;
      
    console.log(message);
      // clear the input box
      messageInput.value = "";
    
      // create db collection and send in the data
      db.ref("messages/" + timestamp).set({
        username,
        message,
        url,
      });
    }
  
  
  
  
    const fetchMessage = db.ref("messages/");
  
  
    fetchMessage.on("child_added", function (snapshot) {
      const messages = snapshot.val();
      const message = `<li class=${
        username === messages.username ? "sent" : "receive"
      }><span>${messages.username}: </span>${messages.message} 
      
      </li>
      <img src="${messages.url}" class=${
        username === messages.username ? "sent" : "receive"
      } width="200px" height="auto" id="myimg" alt="">
      `;
      // append the message on the page
      document.getElementById("messages").innerHTML += message;
    });
  
    // ***************************************************************************
    

// ************ send image to firebase storage ******************* 

  const imageBtn = document.getElementById('img-btn');
  
  imageBtn.addEventListener("click", sendimage);
  function sendimage(){

    // e.preventDefault();
    // let timestamp = Number(new Date());
    const msgImg = document.getElementById('message-img');
    let file_data = msgImg.files[0];
    let storageRef = firebase.storage().ref('images/'+file_data.name);

    storageRef.put(file_data);
    console.log(file_data.name);
    const image = document.getElementById('myimg');

    storageRef.getDownloadURL(file_data)
    .then( function(url){
      console.log(url);
      var imgurl = url
      image.src = url;
    })
    console.log(image.src);
    console.log(file_data.lastModified);
    console.log(file_data);
    msgImg.value = "";

}


  


let timestamp = Number(new Date());
let storageRef= firebase.storage().ref(timestamp.toString());;

  



//emoji working


// const textarea = document.getElementById('textarea');
// textarea.emojioneArea()






















  // ****************** signup *********************
  
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
  
  
// ************* normal login *********************
  
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
  
//  ***************** logout *************************

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
  
  //*************** login with goole   *************************** 
  
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
  
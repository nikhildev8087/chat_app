console.log("hi");

const inputbox = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');
const msgsend = document.querySelector('.msg-send');
const sendli = document.querySelector('sendli');




let messages = [
    {
        "nikhil": "hello"
    },

    {
        "nikhil": "how are your"
    },
    {
        "nikhil": "fine"
    }
];

let messagesString = JSON.stringify(messages);

localStorage.setItem("msg", messagesString);


let messageData = localStorage.getItem("msg");
let messageDatajson = JSON.parse(messageData);

console.log(messageDatajson);

messageDatajson.forEach(data =>{
    console.log(data);
    // let createel = document.createElement('li');
    msgsend.innerHTML = `<li class="reciever float-right p-2 m-3 rounded text-light bg-primary w-25">${data.nikhil}</li>`;
});



sendBtn.addEventListener("click", sendtext);

function sendtext(e) {

    e.preventDefault();

    console.log(inputbox.value);
    sendmsg = inputbox.value;
    msgsend.innerHTML = `<li class="reciever row float-right p-2 m-3 rounded text-light bg-primary w-25">${sendmsg}</li>`;
    inputbox.value = '';
}









































































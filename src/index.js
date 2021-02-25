// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBDOyIRQavILU1h3ScTA9rCpQwShf5L37s",
    authDomain: "msg-app-c0dc1.firebaseapp.com",
    projectId: "msg-app-c0dc1",
    storageBucket: "msg-app-c0dc1.appspot.com",
    messagingSenderId: "942730385747",
    appId: "1:942730385747:web:5778d31598f19d2af329a6",
    measurementId: "G-E0W8E40DVC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

function init() {
    $('#content').hide();
    
    let currentYear = new Date().getFullYear()
    document.getElementById('copyrightText').textContent =
        'Copyright © Zachary Gopinath ' + currentYear;
    userName = prompt('What is your name');

    const welcomeMessageData = {
        userName:userName,
    }

    const welcomeMessage = 
    `<ul class='welcomeMessage'>
                <span class = "welcomeMessageSpan">
                    <i class = "welcomeMessageName">System: </i>
                    Welcome, ${welcomeMessageData['userName']} !
                </span>
            </ul>`

    document.getElementById('messagesLog').innerHTML += welcomeMessage;

    document.getElementById('sendButton').addEventListener('click', sendMessage)
    msgRef.on('child_added', updateMsgs);
    $('#content').show();
}

var userName = '';
var msgRef = db.ref('/messages');

    const updateMsgs = data => {
        const {name, msg } = data.val();
        if(data.val()['msg'] != ''){
        const newMessage =
            `<ul class='${name == userName ? 'isMsg' : 'nonMsg'}' ${name}'>
                <span class ='msg-span'>
                    <i class='${name == userName ? 'myMsg' : 'msg'}'>${name}: </i>
                    ${msg}
                </span>
            </ul>`

        document.getElementById('messagesLog').innerHTML += (newMessage)
        document.getElementById('chat-window').scrollTop = 
        document.getElementById('chat-window').scrollHeight;
        }
    }



function sendMessage(e) {
    e.preventDefault();

    let msgContent = document.getElementById('messageInput').value;

    const messageData = {
        name: userName,
        msg: msgContent,
    }
    if ( messageData['msg']!='' ) {
        msgRef.push(messageData);
    }
    document.getElementById('messageInput').value = '';
}

document.addEventListener('DOMContentLoaded', init);
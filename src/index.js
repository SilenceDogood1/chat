import logMessage from './js/logger';
import './css/main.css';
import { nextTick } from 'q';


const generateHTMLP = (message) => {
  const { text, time } = message;

  const firstPart = '<p><i class=\'fas fa-comment-alt\'>';
  const secondPart = '</i></p>';
// time === '2019-07-10 10:51:32.784'
  const messageDate = new Date(time);

  const formattedTime = messageDate.getHours() + ":" + messageDate.getMinutes() + ":" + messageDate.getSeconds();
  //TODO: wrap formattedTime in HTML tag

  const result = firstPart + formattedTime + " " + text + secondPart;

  return result;
}

const generateDIV = (userMessages) => {
  let divContent = '';
  
  userMessages.forEach(element => {
    divContent += element;
  });
  
  return divContent;
}

const sendToHtml = (messagesToSend) => {
  const user1Messages = messagesToSend.filter(message => message.sender === 'user1').map(message => generateHTMLP(message));
  const user2Messages = messagesToSend.filter(message => message.sender === 'user2').map(message => generateHTMLP(message));

  const user1Div = document.querySelector('#user1');
  user1Div.innerHTML = generateDIV(user1Messages);

  const user2Div = document.querySelector('#user2');
  user2Div.innerHTML = generateDIV(user2Messages);
}

const getChat = () => {
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', 'http://localhost:3000/api/v1', false);
  
  xhr.send();
  
  
  if (xhr.status != 200) {
   
    alert( xhr.status + ': ' + xhr.statusText ); 
  
    
  } else {
    const nextStep = JSON.parse(xhr.responseText);
    console.log(nextStep);
    sendToHtml(nextStep);
  }
}

getChat();

const send = () => {
  const input = document.querySelector("#input-text-chat-debug");
  const message = input.value;
  input.value = "";

  const post = new XMLHttpRequest();

  post.open('POST', 'http://localhost:3000/api/v1', false);
  post.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  post.send(JSON.stringify({ message }));
 
  
  if (post.status != 200) {
    alert( post.status + ': ' + post.statusText);
  } else {
    getChat();
  }
}


const sendBtn = document.querySelector('#btn-send');
console.log(sendBtn);
sendBtn.onclick = send;


function displayDate () {
  document.getElementById("demo").innerHTML = Date();
};
import logMessage from './js/logger';
import './css/main.css';
import { nextTick } from 'q';


const generateHTMLP = (message) => {
  const { text } = message;

  const firstPart = '<p><i class=\'fas fa-comment-alt\'>';
  const secondPart = '</i></p>';
  
  const result = firstPart + text + secondPart;

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


// <p><i class='fas fa-comment-alt'> text </i></p>
/*
// Log message to console
logMessage('A very warm welcome to Expack!')
// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef  
}
*/
//const letTry = () => {
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


//window.onload(letTry);

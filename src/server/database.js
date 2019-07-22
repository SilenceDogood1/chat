/*
const messages = [
    { sender: 'user1', text: 'Hi' },
    { sender: 'user2', text: 'Hello' },
    { sender: 'user2', text: 'Hello1' },
    { sender: 'user2', text: 'Hello2' },
    { sender: 'user1', text: 'Hi' },
    { sender: 'user1', text: 'Hi' },
    { sender: 'user1', text: 'Hi' },
    { sender: 'user1', text: 'Hi' },
  ]
*/
  
// Connecting options to PostgreSQL
//Setting up a connection
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize('test1', 'postgres', 'centrum1212', {
  host: 'localhost',
  dialect: 'postgres',
});
  
const Chat = db.define('chats', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  sender: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
    
  }
}, {

});


export const create = (text) => {
  return Chat.create({ sender: 'user2', text })
    .then(result => result)
    .catch(error => console.log(error));
};

const getChat = () => {
  return Chat.findAll({})
    .then(result => result)
    .catch(error => console.log(error));;
};


export const getMessages = () => {
  // сделать из результата массив как messages и вернуть его из функции вместо messages
  return getChat().then(result => result);
};

 
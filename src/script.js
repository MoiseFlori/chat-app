// script.js

import { handleOutgoingMessage } from './functions.js';

const messageInput = document.querySelector('.message-input');
const chatBody = document.querySelector('.chat-body');
const sendMessageButton = document.querySelector('#send-message');

const userData = {
  message: null,
};

// Evenimente pentru input și buton
messageInput.addEventListener('keydown', e => {
  if (e.key === 'Enter')
    handleOutgoingMessage(e, messageInput, chatBody, userData);
});

sendMessageButton.addEventListener('click', e =>
  handleOutgoingMessage(e, messageInput, chatBody, userData)
);

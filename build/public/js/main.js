"use strict";
const form = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();
// handel messages from server
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
    //   scroll down after message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
// message submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // get the text from th message
    const msg = e.target.elements.msg.value;
    // Emit message to the server
    socket.emit('chatMessage', msg);
    //   clear msg
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});
// output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
            <p class="text">
              ${message.text}
            </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

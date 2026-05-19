

const addMessage = (message) => {
    const pTag = document.createElement('p');
    pTag.appendChild(document.createTextNode(message));
    $('#messages').append(pTag);
};

const hostname = window.location.hostname; 
const ws = new WebSocket('ws://' + hostname + ':6060');


ws.onopen = () => { 
    console.log('Now connected'); 
};

ws.onmessage = (event) => { 
    const messages = JSON.parse(event.data);
    messages.forEach(addMessage);
};

const send = () => {
    const username =  $('#name').val() || '???'
    ws.send(`${username}: ${$('#message').val()}`);
    $('#message').val('');
}; 

$('#b_send').click(function() {
    send();
});
    
    
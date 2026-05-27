

const addMessage = (message) => {
    const pTag = document.createElement('p');
    pTag.appendChild(document.createTextNode(message));
    $('#messages').append(pTag);
};

const hostname = window.location.hostname; 
const ws = new WebSocket('ws://' + hostname + ':6060');


ws.onopen = () => { 
    console.log('WS: Now connected'); 
    ws.send(JSON.stringify({
        type: "register",
        name: $('#name').val()
    }));
};

ws.onmessage = (event) => { 
    const messages = JSON.parse(event.data);
    // zwracac liste uzytkownikow
   // messages.forEach(addMessage);

   if (messages.type === "message") {
        addMessage(`${messages.nameFrom}: ${messages.message}`);
    }

    if (messages.type === 'users') {
        $('#users').empty();
        $('#users').append(`<option value="">ALL</option>`); // boradcast
        messages.users.forEach(u => {
            $('#users').append(`<option value="${u}">${u}</option>`);
    });
}

    
};
// on('message') = Node.js (ws server / client w Node)
// onmessage = przeglądarka
// Jeżeli skrypt jest wykonywany w przeglądarce^
// serwer -> ws.onmessage -> addMessage -> html


// const send = () => {
//     const username =  $('#name').val() || '???'
//     ws.send(`${username}: ${$('#message').val()}`);
//     $('#message').val('');
// }; 
// $('#name') jquery $, szukaj html o id #name
// #name selector CSS id = name do jquery


const send = () => {
    const selectedUser = $('#users').val();

    const sending = {
        type: "message",
        nameFrom :  $('#name').val() || '???',
        nameTo : selectedUser || null,
        message :  $('#message').val()
    }

    ws.send(JSON.stringify(sending)); // serwer dostaje teraz jsona
    $('#message').val('');
};

$('#b_send').click(function() {
    send();
});
    
    
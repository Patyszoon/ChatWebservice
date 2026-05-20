const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:6060');

ws.onopen = function(event) {
  // Handle connection open
  console.log('WS: Connected to server');
  //ws.send('NodeClient: Hello from node.js client');
  ws.send(JSON.stringify({
        type: "register",
        name: "NodeClient"
    }));

    ws.send(JSON.stringify({
        type: "message",
        nameFrom: "NodeClient",
        nameTo: null, // zeby przywital sie z kazdym
        message: "Hello from node.js client"
    }));
};

// ws.onmessage = function(event) {
//   // Handle received message
// //   
// };

// ws.onmessage = (data) => { 
//     console.log('WS: Received:', data.toString());
// }; ?????????????

ws.on('message', (data) => {
    console.log('WS: Received:', data.toString());
});


ws.onclose = function(event) {
  // Handle connection close
    console.log('WS: Disconnected');
};

function sendMessage(message) {
  ws.send(message);
}
const http = require('http');
const express = require('express');
const app = express();
const path = require("path");
const WebSocket = require('ws');

  app.set('view engine', 'ejs'); 

  app.get('/', function(req, res) {
      res.render('index'); 
  });
 
  app.use("/myjs", express.static("./js"));
  app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));
  
 const server = http.createServer(app);
 const port = 8000;
 server.listen(port);
 console.debug('Server listening on port ' + port);

 const socketServer = new WebSocket.Server({port: 6060});
 console.debug('WebSocket Server listening on port 6060');
 
 const messages = ['Start Chatting!'];

 socketServer.on('connection', (socketClient) => {
  console.log('connected');
  console.log('client Set length: ', socketServer.clients.size);
  socketClient.send(JSON.stringify(messages));
  socketClient.on('message', (message) => {
    messages.push(message);
    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        if(client!=socketClient)
        client.send(JSON.stringify([message]));
      }
    });
  });
  socketClient.on('close', (socketClient) => {
    console.log('closed'); 
    console.log('Number of clients: ', socketServer.clients.size);
  });
});

  
 

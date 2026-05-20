const http = require('http');
const express = require('express');
const app = express();
const path = require("path");
const WebSocket = require('ws');
const { get } = require('jquery');

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

 const users = {}; // lista uzytwkonikow np. kasia: [object WebSocket],

 function getUsers(){
  const list = Object.keys(users);

  const payload = {
    type: "users",
    users: list
  };

  socketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
 }

 socketServer.on('connection', (socketClient) => {
  console.log('connected');
  console.log('client Set length: ', socketServer.clients.size);

  socketClient.on('message', (message) => {
    const data = JSON.parse(message.toString());

     if (data.type === "register"){
      users[data.name] = socketClient;
      getUsers();
      return;
     }

      if (data.type === "message"){
        const payload = {
                type: "message",
                nameFrom: data.nameFrom,
                message: data.message
            };

            if(data.nameTo){
              
              const target = users[data.nameTo]; // odbiorca

              // jjesli wybrano odbiorce
              if (target) {
                  target.send(JSON.stringify(payload));
              }

            }else{ // BROADCAST
              socketServer.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify(payload));
                }
              });
            }
            return;
      }

  });

  socketClient.on('close', () => {
    console.log('closed'); 
    console.log('Number of clients: ', socketServer.clients.size);
    for (const name in users) { // wyczysc users
            if (users[name] === socketClient) {
                delete users[name];
                break;
            }
        }

        getUsers();
  });
});

  
 

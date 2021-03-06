const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
var WebSocketServer = require('websocket').server;
var http = require('http');


//--------------------------------------------------------------------------init
const router = express.Router();
router.route('/start').all(onStart);
router.route('/stop').all(onStop);
router.route('/setStatus').all(setStatus);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});

var status = {"Temp1": "...","Temp2": "...","Cpu":"...","Enable":"...","CountConn":"...","CountPing":"..."}
var socketActive = false;
var clients = [ ];
var pingCount = 0;

//----------------------------------------------------------------------HTTP
function onStart(req, res){//enable sending to everyone
	console.log("onStart on HTTP");
	socketActive="true";
	//send to all client the new status
	sendStatusToAll();
	res.status(200).json({"onStart": "ok"});
}
function onStop(req, res){//disable sending to everyone
	console.log("onStop on HTTP");
	
	//send to all client the new status
	//just for see Enable=false
	socketActive="false";
	sendStatusToAll();
	//than disable it
	socketActive=false;
	res.status(200).json({"onStop": "ok"});
}

function setStatus(req, res){//set new status
	console.log("setStatus on HTTP");
	//send to all client the new status if sending is enable
		status =req.body;
		sendStatusToAll();
	  res.status(200).json({"onStop": "ok"});
}

function sendStatusToAll(){
		status["Enable"]=socketActive+"";
		status["CountConn"] = clients.length; 
		status["CountPing"] = pingCount; 
		if(socketActive){
			console.log("Send new status to all (socket).");
			for (var i=0; i < clients.length; i++) {
			  clients[i].sendUTF( JSON.stringify(status));
			}
		}
}
//------------------------------------------------------------------websocket-server

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(3333, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
	  console.log("Accepted connection (socket).");
	  //add this connection to array clients
	  clients.push(connection);
	  
	  //send to all for see connection number increse	  
	  status["CountConn"] = clients.length; 
	  sendStatusToAll();
  
  
	  // This is the most important callback for us, we'll handle
	  // all messages from users here.				 
	connection.on('message', function(message) {
		/*
		if (message.type === 'utf8') {
		  // process WebSocket message
		}*/
		console.log("Received new message (socket).");
		if (message["utf8Data"] === 'PINGMSG') {
				pingCount++;
				sendStatusToAll();
		}else{
			console.log("RECIVED UNKNOW MSG ON SOCKET!");
		}
		
		
	});
				
	//handle close connection
	connection.on('close', function(connection_closed) {
		//WARNING connection_closed is not connection
		//so for free memory of clients array need work with connection
		//not with connection_closed which is arg of callback "close"
		//close user connection	
		console.log("Close connection (socket).");
		//remove connection from clients (free memory)
		var index = clients.indexOf(connection);
			if (index > -1) {
		  clients.splice(index, 1);
		}
		
	
		//send to all for see connection number decrese
		sendStatusToAll();
  }); 
});
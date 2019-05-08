# React-Node-socket-example


Example of a server node and a react server with HTTP and WEBSOCKET communication

On react user-interface the buttons "start", "stop" and "generate new status" send an HTTP comunication to node

Node will send its status on WebSocket, if is enabled to do

On react user-interface the buttons "ping" send on WebSocket an int to Node


How to test it:
NODE
          cd NodeSide
          npm install
          node server.js
REACT
          cd ReactSide
          npm install
          npm start
          

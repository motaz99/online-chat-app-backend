const express = require('express');

const app = express();
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello, World! we will do greate work with this project');
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Emit a message to all connected clients
  socket.broadcast.emit('user_connected', { userId: socket.id });

  // socket.on('join_room', (data) => {
  //   socket.join(data);
  // });

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

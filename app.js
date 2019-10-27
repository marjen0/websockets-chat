const express = require('express');
const app = express();
const socket = require('socket.io');


app.use(express.static('public'));


const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

const io = socket(server);

io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing',data);
    });
});

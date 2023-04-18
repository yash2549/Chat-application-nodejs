// node server which will hendle socket.io connections

// const io = require("socket.io")(8000) // cors added in new versionyashyayas


const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});


const users = {};

console.log("----------------------------------");
io.on('connection', socket => {
    // console.log("enter =========>");
    socket.on('new-user-joined', name => {
        // console.log("=======>", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { name: users[socket.id], message: message })
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    })


})



//



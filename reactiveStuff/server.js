var http = require('http').Server();
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');

  // receives a command from the frontend and deceides how to handle this
  // in most cases it wil 
  socket.on('msg', function (msg) {
  	console.log("msg: ", msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
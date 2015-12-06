var http = require('http').Server();
var io = require('socket.io')(http);
var fs = require('fs');


io.on('connection', function(socket) {
  console.log('connection...');

  socket.on('msg', function (msg) {
  	console.log("msg: ", msg);
  	writeGestureToFs(msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000...');
});



function writeGestureToFs(gestureInfo) {

	var dir = './gestureData/' + gestureInfo.gestureName;
	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

	fs.writeFile(dir + "/" + (new Date().getTime()) + ".json", JSON.stringify(gestureInfo), function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 

}
var brain = require("brain");
var fs = require("fs");

// var net = new brain.NeuralNetwork();

// var xor = [
//   { input: [0, 0], output: [0]},
//   { input: [0, 1], output: [1]},
//   { input: [1, 0], output: [1]},
//   { input: [1, 1], output: [0]}];

// var trainStream = net.createTrainStream({
//   /**
//    * Write training data to the stream. Called on each training iteration.
//    */
//   floodCallback: function() {
//     flood(trainStream, xor);
//   },

//   /**
//    * Called when the network is done training.
//    */
//   doneTrainingCallback: function(obj) {
//     console.log("trained in " + obj.iterations + " iterations with error: "
//                 + obj.error);

//     var result = net.run([0, 1]);

//     console.log("0 XOR 1: ", result);  // 0.987
//   }
// });

// // kick it off
// flood(trainStream, xor);


// function flood(stream, data) {
//   for (var i = 0; i < data.length; i++) {
//     stream.write(data[i]);
//   }
//   // let it know we've reached the end of the data
//   stream.write(null);
// }

var gestureInput = [];
fs.readFile("../../training_data/left_down.json", "utf8", function(err, data) {
	if (err) {
		console.log(err);
		return;
	}
	var data = JSON.parse(data).frameData;
	for (var i = 0; i < data.length; i++) {
		gestureInput.push({
			input: [
				data[i].handAngle,
				data[i].fingers[0].angle,
				data[i].fingers[1].angle,
				data[i].fingers[2].angle,
				data[i].fingers[3].angle,
				data[i].fingers[4].angle
			],
			output: [1, 0]
		})
	}

});

fs.readFile("../../training_data/right_down.json", "utf8", function(err, data) {
	if (err) {
		console.log(err);
		return;
	}
	var data = JSON.parse(data).frameData;
	for (var i = 0; i < data.length; i++) {
		gestureInput.push({
			input: [
				data[i].handAngle,
				data[i].fingers[0].angle,
				data[i].fingers[1].angle,
				data[i].fingers[2].angle,
				data[i].fingers[3].angle,
				data[i].fingers[4].angle
			],
			output: [0, 1]
		})
	}
});


setTimeout(function() {

	console.log("start training ", gestureInput);

	var net = new brain.NeuralNetwork();

	var trainStream = net.createTrainStream({

		floodCallback: function() {
			flood(trainStream, gestureInput);
		},

		doneTrainingCallback: function(obj) {
			console.log("trained in " + obj.iterations + " iterations with error: " + obj.error);

			var result = net.run([ 10.633381009261473,
       -29.481282133249188,
       -27.28138284945467,
       -36.707035125075215,
       -53.47914756619225,
       -68.0605122077572 ]);

			console.log("result ", result); 
		}
	})



	flood(trainStream, gestureInput);

	function flood(stream, data) {
		for (var i = 0; i < data.length; i++) {
			stream.write(data[i]);
		}
		stream.write(null);
	}

}, 5000);
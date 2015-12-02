var brain = require("brain");
var fs = require("fs");

fs.readFile("./distance_training_data.json", "utf8", function(err, data) {
	if (err) {
		console.log(err);
		return;
	}
	trainBrain(JSON.parse(data));
})

function trainBrain(data) {

	var net = new brain.NeuralNetwork();

	net.train(data);

	var output = net.run([
		0.7995418895774005,
		0.6203275553079035,
		0.47605211120548563,
		0.5728831157114338
	]); 

	console.log(output);

	fs.writeFile("./distance_training_net.json", JSON.stringify(net.toJSON()), function(err) {
		if (err) {
			console.log(err);
		}
	})
}




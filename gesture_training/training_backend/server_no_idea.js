var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var cors = require('cors');
var fs = require('fs');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;        // set our port

var router = express.Router();              // get an instance of the express Router


router.post("/saveTrainingData", function(req, res) {
	var dataObj = req.body.data;
	var fileName = (new Date()).getTime() + req.body.trainingName;
	fs.writeFile("../data/" + fileName + ".json", JSON.stringify(dataObj), function(err) {
	    if(err) {
	    	res.json();
	        return console.log(err);
	    }
	    res.json();
	    console.log("fileName: ", fileName);
	}); 
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);
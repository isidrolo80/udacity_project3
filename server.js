// Setup empty JS object to act as endpoint for all routes
projectData = {};
const data = [];
// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

	function listening() {
	    console.log('Running on port '+port);
	}



// GET route that retuns projectData
app.get('/all', sendData);

function sendData (request, response) {
  response.send(data);
};


// POST route
app.post('/add', callBack);

function callBack(req,res){
  res.send('POST received');
};

app.post('/addData', addData);

function addData (req,res){
	newEntry = {
		temperature: req.body.temperature,
		date: req.body.date,
		userResponse: req.body.userResponse
	}

    data.push(newEntry);
    res.send(data);
    console.log("My project data: ");
    console.log(data);
};

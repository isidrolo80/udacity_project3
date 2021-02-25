// Setup all dependencies and app 
let data = [];
// Import dependencies
const express = require('express');
// We create instance of the app to use Express
const myapp = express();
//Confiture express to use body-parser 
const body_Parser = require('body-parser')
myapp.use(body_Parser.urlencoded({ extended: false }));
myapp.use(body_Parser.json());
// We setup cors to be able to allow cross origin
const cors = require('cors');
myapp.use(cors());
// Use the following folder as our main=
myapp.use(express.static('weather'));






// Setup Server
const port = 8080;
const server = myapp.listen(port, listening);

function listening() {
	   console.log('My node server is up locally on port '+port);
}



// We create a route to GET all data
myapp.get('/getAllData', getAllData);

function getAllData (req, res) {
  //we send as a response the data variable
  res.send(data);
};


// These are my POST routes to test and add data 
// Route to add data sent from the website. The route and callback function have the same name
myapp.post('/pushNewData', pushNewData);

function pushNewData (req,res){
	dataToBePushed = {
		temperature: req.body.temperature,
		date: req.body.date,
		myfeeligs: req.body.myfeeligs
	}

    data.push(dataToBePushed);
    //Sends the last data entered as response
    res.send(data);
    // Test on the server console the data pushed to the server
    console.log("My project data: ");
    console.log(data);
};

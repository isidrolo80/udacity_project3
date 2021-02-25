/* Global Variables */
let myOpenWeatherMapAPIKey = "ea3ab8e55606cf6bd6983f2eaf2387aa";
let api_baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
//Create date variable to use at updateUI
let todaysDate = new Date();
let myDate = todaysDate.getMonth()+'.'+ todaysDate.getDate()+'.'+ todaysDate.getFullYear();

// Async POST
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  	});
    try {
      const newData = await response.json();
      console.log("mynewdata");
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};


//retrieve all the data
const retrieveData = async (base_url=api_baseURL, zipCode=document.getElementById("zipcode").value, personalAPIKey = myOpenWeatherMapAPIKey) =>{ 
  let url = base_url+zipCode+"&appid="+personalAPIKey;
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData);
  return allData;
  }
  catch(error) {
    console.log("error", error);
  }
};

//EventListener for the element with ID generate 
document.getElementById("submit").addEventListener("click", functionToRunOnClickGenerate);

function functionToRunOnClickGenerate() {
	retrieveData().then(function(allData){
	postData('/pushNewData', {temperature: allData.main.temp, date: myDate, myfeeligs: document.getElementById("mood").value})
	updateUI();
});
}

const updateUI = async () => {
	const request = await fetch('/getAllData')
	try {
		const allData = await request.json();
		console.log(allData);
		var highest = allData[ Object.keys(allData).sort().pop() ];
		document.getElementById("date").innerHTML = "<p><b>Date: </b>"+highest.date+"</p>";
		document.getElementById("temperature").innerHTML = "<p><b>Temperature: </b>"+highest.temperature+"</p>";
		document.getElementById("myfeeligs").innerHTML = "<p><b>I'm feeling: </b>"+highest.myfeeligs+"</p>";

	} catch(error) {
		console.log("error", error);
	}
}
/* Global Variables */
let myOpenWeatherMapAPIKey = "ea3ab8e55606cf6bd6983f2eaf2387aa";
let cityName = "33155";
let api_baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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


//Async - GET
const retrieveData = async (base_url=api_baseURL, zipCode=document.getElementById("zip").value, personalAPIKey = myOpenWeatherMapAPIKey) =>{ 
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
    // appropriately handle the error
  }
};

//EventListener for the element with ID generate 
document.getElementById("generate").addEventListener("click", functionToRunOnClickGenerate);

function functionToRunOnClickGenerate() {
	retrieveData().then(function(allData){
	postData('/addData', {temperature: allData.main.temp, date: newDate, userResponse: document.getElementById("feelings").value})
	updateUI();
});
}

const updateUI = async () => {
	const request = await fetch('/all')
	try {
		const allData = await request.json();
		console.log(allData);
		var highest = allData[ Object.keys(allData).sort().pop() ];
		document.getElementById("date").innerHTML = highest.date;
		document.getElementById("temp").innerHTML = highest.temperature;
		document.getElementById("content").innerHTML = highest.userResponse;

	} catch(error) {
		console.log("error", error);
	}
}
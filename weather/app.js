/* Global Variables */
const myOpenWeatherMapAPIKey = "ea3ab8e55606cf6bd6983f2eaf2387aa";
let api_baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
//Create date variable to use at updateUI
let todaysDate = new Date();
let myDate = (todaysDate.getMonth()+1)+'.'+ todaysDate.getDate()+'.'+ todaysDate.getFullYear(); // +1 is used as the regular format for dates is 0 - 11 instead of 1 - 12 

// Async POST
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
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
const retrieveData = async (base_url=api_baseURL, zipCode=document.getElementById("zip").value, personalAPIKey = myOpenWeatherMapAPIKey) =>{ 
  let url = base_url+zipCode+"&appid="+personalAPIKey+"&units=imperial";
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
document.getElementById("generate").addEventListener("click", functionToRunOnClickGenerate);

function functionToRunOnClickGenerate() {
	retrieveData().then(function(allData){
	postData('/pushNewData', {temp: allData.main.temp, date: myDate, content: document.getElementById("feelings").value})
	updateUI();
});
}

const updateUI = async () => {
	const request = await fetch('/getAllData')
	try {
		const allData = await request.json();
    console.log("UpdateUI INFO");
		console.log(allData);
		//var highest = allData[ Object.keys(allData).sort().pop() ];
		document.getElementById("date").innerHTML = "<p><b>Date: </b>"+allData.date+"</p>";
		document.getElementById("temp").innerHTML = "<p><b>Temperature: </b>"+allData.temp+"</p>";
		document.getElementById("content").innerHTML = "<p><b>I'm feeling: </b>"+allData.content+"</p>";

	} catch(error) {
		console.log("error", error);
	}
}
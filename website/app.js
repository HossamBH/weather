/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/'+ d.getDate()+'/'+ d.getFullYear();
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = ',us&appid=f88d2894526d19922bbdcdf6882b9a07&units=metric';
// zipCode "94040"
// get the data after click on generate
document.getElementById('generate').addEventListener('click', getFormData);

function getFormData(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // get the weather from the api
    const url = baseURL + zip + apiKey;
    getWeather(url)
    .then(function(data){
        enteringData = {
            date:newDate,
            temp: data.main.temp,
            content: feelings
        };
        // Add the data to the array
        postData('/addData', enteringData);

        // update the website
        updateUI();
    })
}

const getWeather = async(url = '')=>{
    const request = await fetch(url);
    try{
        const getData = await request.json();
        return getData;
    }
    catch(error){
        console.log('error', error)
    }
};

const postData = async(url = '', data = {})=>{
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
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};

const updateUI =  async()=>{
    const req = await fetch('/getAllData');
    try{
        const displayData = await req.json();
        document.getElementById('date').innerHTML = displayData.date;
        document.getElementById('temp').innerHTML = displayData.temp;
        document.getElementById('content').innerHTML = displayData.content;
    }
    catch(error){
        console.log("error", error);
    }
}
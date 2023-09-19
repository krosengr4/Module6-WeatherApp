var citySearchTerm = document.getElementById("city-search-term");
var userFormEl = document.querySelector('#city-form');
var nameInputEl = document.querySelector('#cityName');
var tableBody = document.getElementById('city-table');
var cityButtons = document.getElementById('city-buttons');

// List variables so they can be global.
var cityName;
var date;  
var temp;
var wind;
var humidity;
var lat;
var lon;  
var icon;
var prettyCity;

var forecastArr = []; // <--- Empty array to store data from 5 day forecast API.
var cityDataArr = []; // <--- Empty array to store the list of cities.  
const maxCitiesInList = 5;

const apiKey = '7439ca8ff028e31fdc13784c385851ac';

// First Function after the click event on "Get Weather". Calls getCity function if user enters anything in the input bar for city.
var formSubmitHandler = function (event) {
    event.preventDefault();

    cityName = nameInputEl.value.trim();  
    console.log(cityName);
    if(cityName) {
        getCity(cityName);
        nameInputEl.value = '';
    }else{
        alert('Please enter a City Name');
    }
};

// Function that runs when a button is click under the "Cities" list. Displays the current weather and 5 day forecast when one of these are clicked.
var cityButtonHandler = function (event) {
    event.preventDefault();

    var city = event.target.getAttribute('id');
    getCity(city);
}

// Function to get the data for current weather, and then calls addCityToList, getFiveDay, displayCurrentWeather, and buildCityList functions if city is valid.
function getCity (cityName) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(requestUrl)
    .then(function (response){
        if (response.status != 200){
            alert('City not found. Please enter a valid city.')
        }
        return response.json();
    })
    .then(function (data){
        console.log('-----Weather Data------\n', data);
        if (data.cod === 200) {

        temp = data.main.temp;
        wind = data.wind.speed;
        humidity = data.main.humidity;
        lat = data.coord.lat;
        lon = data.coord.lon;
        prettyCity = data.name;
        console.log(temp,wind,humidity, lat,lon);

        manageCityList(prettyCity);
        getFiveDay();
        displayCurrentWeather();
        buildCityList();
        displayButtons();
        };
    })
};

// Function to display the current weather data we want (Temp, wind, and Humidity) as well as the city the user searched.
function displayCurrentWeather(){  
    console.log(cityName);
    console.log(citySearchTerm);
    citySearchTerm.innerHTML = prettyCity;

    var weatherLi = document.getElementById('weather-container');
    while(weatherLi.firstChild){
        weatherLi.removeChild(weatherLi.firstChild);
    };

    var weatherBox = document.createElement('li');
    weatherBox.textContent = 'Temp: ' + temp + ' degrees | ' + 'Wind: ' + wind + ' MPH | ' + 'Humidity: ' + humidity + ' % ';
    document.getElementById('weather-container').appendChild(weatherBox);

};

// Function to get the data for the 5 day forecast. Adds data: date, icon, temp, wind, and humidity to the forecastArr array.
// Then calls displayDay1-5 functions.
function getFiveDay () {
    requestUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(requestUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log('-----Forecast Data------\n', data)

    var cnt=data.cnt;
        forecastArr = []; 
        for (i=0; i<cnt; i++){
        if (data.list[i].dt_txt.substring(11,13) == "18"){ // <---- Grabs the 12 oclock hour from the data returned from the API.
            console.log(data.list[i].main.temp, data.list[i].main.humidity, data.list[i].wind.speed);
            console.log(data.list[i].dt_txt);

            forecastArr.unshift(data.list[i].main.humidity);
            forecastArr.unshift(data.list[i].wind.speed);
            forecastArr.unshift(data.list[i].main.temp);
            forecastArr.unshift(data.list[i].weather[0].icon);
            forecastArr.unshift(data.list[i].dt_txt.substring(0,11));
        };
        
    };
    console.log('-----Forecast Array------\n', forecastArr);
    
    displayDay1();
    displayDay2();
    displayDay3();
    displayDay4();
    displayDay5();
    })


    // Date, Temp, Wind, and Humidity for the next 5 days
};

// displayDay functions(1-5) display the 5 day forecast on the screen.
function displayDay1 () {

    var date1 = document.getElementById('date1');
    date1.innerHTML = "Date: " + forecastArr[20];

    var icon1 = document.getElementById('icon1');
    icon1.outerHTML = '<img src=https://openweathermap.org/img/wn/'+forecastArr[21]+'@2x.png id=icon1>';
    console.log(icon1.outerHTML);

    var temp1 = document.getElementById('temp1');
    temp1.innerHTML = 'Temp: ' + forecastArr[22] + ' degrees';

    var wind1 = document.getElementById('wind1');
    wind1.innerHTML = 'Wind: ' + forecastArr[23] + ' MPH';

    var hum1 = document.getElementById('hum1');
    hum1.innerHTML = 'Humidity: ' + forecastArr [24] + ' %';
};

function displayDay2 () {
    var date2 = document.getElementById('date2');
    date2.innerHTML = "Date: " + forecastArr[15];

    var icon2 = document.getElementById('icon2');
    icon2.outerHTML = '<img src=https://openweathermap.org/img/wn/'+forecastArr[16]+'@2x.png id=icon2>';

    var temp2 = document.getElementById('temp2');
    temp2.innerHTML = 'Temp: ' + forecastArr[17] + ' degrees';

    var wind2 = document.getElementById('wind2');
    wind2.innerHTML = 'Wind: ' + forecastArr[18] + ' MPH';

    var hum2 = document.getElementById('hum2');
    hum2.innerHTML = 'Humidity: ' + forecastArr [19] + ' %';
};

function displayDay3 () {
    var date3 = document.getElementById('date3');
    date3.innerHTML = "Date: " + forecastArr[10];

    var icon3 = document.getElementById('icon3');
    icon3.outerHTML = '<img src=https://openweathermap.org/img/wn/'+forecastArr[11]+'@2x.png id=icon3>';

    var temp3 = document.getElementById('temp3');
    temp3.innerHTML = 'Temp: ' + forecastArr[12] + ' degrees';

    var wind3 = document.getElementById('wind3');
    wind3.innerHTML = 'Wind: ' + forecastArr[13] + ' MPH';

    var hum3 = document.getElementById('hum3');
    hum3.innerHTML = 'Humidity: ' + forecastArr [14] + ' %';
};

function displayDay4 () {
    var date4 = document.getElementById('date4');
    date4.innerHTML = "Date: " + forecastArr[5];

    var icon4 = document.getElementById('icon4');
    icon4.outerHTML = '<img src=https://openweathermap.org/img/wn/'+forecastArr[6]+'@2x.png id=icon4>';

    var temp4 = document.getElementById('temp4');
    temp4.innerHTML = 'Temp: ' + forecastArr[7] + ' degrees';

    var wind4 = document.getElementById('wind4');
    wind4.innerHTML = 'Wind: ' + forecastArr[8] + ' MPH';

    var hum4 = document.getElementById('hum4');
    hum4.innerHTML = 'Humidity: ' + forecastArr [9] + ' %';
};

function displayDay5 () {
    var date5 = document.getElementById('date5');
    date5.innerHTML = "Date: " + forecastArr[0];

    var icon5 = document.getElementById('icon5');
    icon5.outerHTML = '<img src=https://openweathermap.org/img/wn/'+forecastArr[1]+'@2x.png id=icon5>';

    var temp5 = document.getElementById('temp5');
    temp5.innerHTML = 'Temp: ' + forecastArr[2] + ' degrees';

    var wind5 = document.getElementById('wind5');
    wind5.innerHTML = 'Wind: ' + forecastArr[3] + ' MPH';

    var hum5 = document.getElementById('hum5');
    hum5.innerHTML = 'Humidity: ' + forecastArr [4] + ' %';
};

// Function to add city, that the user put in, into local storage.
// Also removes duplicate city names. 
function manageCityList(cityName) {
    cityDataArr.unshift(cityName);

    for (i=1; i<= cityDataArr.length; i++) { //<---- Removes duplicates in the list - start with 1 so don't remove the one just added
        if (cityName === cityDataArr[i]) {
            cityDataArr.splice(i,1);
        }
    }
    while(cityDataArr.length > maxCitiesInList) {
        cityDataArr.pop(); 
    }
    localStorage.setItem("weather", JSON.stringify(cityDataArr));
    };

// Function to get the city name out of local storage and put it into the cityDataArr array.
function buildCityList () {
    let localReturn = localStorage.getItem("weather");
    if (localReturn){
        cityDataArr = JSON.parse(localReturn);
        };
    console.log(cityDataArr);
};

// Function to add buttons into the list under "Cities".
function displayButtons () {
    removeButtons();
    for (i=0; i<cityDataArr.length; i++) {
        var but1 = document.createElement('button');
        but1.className='btn';
        but1.id = cityDataArr[i];
        but1.innerHTML = cityDataArr[i];
        
        cityButtons.appendChild(but1);
    };
cityButtons.addEventListener('click', cityButtonHandler);
};

// Function to remove unwanted buttons from the list of cities. 
function removeButtons () {
    var buttons = cityButtons.getElementsByTagName('button');
console.log(buttons);
    for(i=0; i<buttons.length; i++){
        buttons[i].remove();
    };

    buttons = cityButtons.getElementsByTagName('button');
console.log(buttons);
    for(i=0; i<buttons.length; i++){
        buttons[i].remove();
};

buttons = cityButtons.getElementsByTagName('button');
console.log(buttons);
    for(i=0; i<buttons.length; i++){
        buttons[i].remove();
    };
};

// Builds the list of most recent cities when page is opened.
buildCityList(); 
displayButtons();

// Displays the current and future conditions of the last visited city when the application is reopened. 
if (cityDataArr) {
    getCity(cityDataArr[0]);
}else{ getCity("Austin")};

userFormEl.addEventListener('submit', formSubmitHandler); // <--- When user submits a city, forSubmitHandler is called and the magic begins.
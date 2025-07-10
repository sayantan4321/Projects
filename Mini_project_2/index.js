const userTab = document.querySelector("[data-userWeather");
const searchTab = document.querySelector("[data-searchWeather");
const weatherContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const LoadingScreen = document.querySelector(".Loading-container");
const userInfoContainer = document.querySelector(".user-info-container")


let currentTab = userTab; // default when page loads
const API_KEY = "e22236e310220dddd4415abe79358d9a";
currentTab.classList.add("current-tab") // adding css property added in this current tab

// now after click two tabs need to be switch each other
userTab.addEventListener("click", () => { 
    // pass the clicked tab as input parameter
    switchTab(userTab);
});
searchTab.addEventListener("click", () => { 
    // pass the clicked tab as input parameter
    switchTab(searchTab);
});

// Initially need to check that lat & lon r present in session storage or not
getFromSessionStorage();

function switchTab(clickedTab){
    // if i click on the tab where i am currently in so no need to anything
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab"); // removing details of clicking
        currentTab = clickedTab;
        currentTab.classList.add("current-tab"); // adding details of clicking

        if(!searchForm.classList.contains("active")){ // if searchform is not active, so we have to make it active
            // if its does not contains active class that means its not visible yet and we clicked means we want to make it visible.
            userInfoContainer.classList.remove("active"); //need to disable
            grantAccessContainer.classList.remove("active"); //need to disable
            searchForm.classList.add("active"); //need to enable
        }
        else{  // switching from search wearther to your weather
            searchForm.classList.remove("active"); 
            userInfoContainer.classList.remove("active");
            getFromSessionStorage(); // -> get location co-ordinates if we save in local storage
        }
    }    
}
function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates") // finding in session local storage
    if(!localCoordinates) {
       // if not present ->there is no location access
       // so grant access window should apprear
       grantAccessContainer.classList.add("active");

    }
    else {
        const coOrdinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coOrdinates);
    }
}
async function fetchUserWeatherInfo(coOrdinates) {
    const {lat, lon} = coOrdinates;
    console.log(lat);
    
    grantAccessContainer.classList.remove("active"); // invisible this
    LoadingScreen.classList.add("active"); // loader visible

    // API CALL
    try {
        const result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
        const data = await result.json(); //await till get the data
        LoadingScreen.classList.remove("active"); // loader work done
        // nned to shpw the location weather details
        userInfoContainer.classList.add("active"); 

        // func will take nessesary data from the json values
        renderWeatherInfo(data);

    }
    catch(err) {
       // alert("location not found")
    }
}

// Optional chainging operator:  this makes easy to access nested properties of JSON obj. 
// If the property does not exist then it will return = undifined
function renderWeatherInfo(weatherInfo) {
    // need to fetch the elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-WeatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudyness]");
 
    console.log(weatherInfo);
    
    // fetch values from json obj to UI
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagsapi.com/${weatherInfo?.sys?.country}/flat/64.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed}m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}


const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation) // func call

// For your location tab we need the location access from browser which was geo-Location 
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition); // using getCurrentPosition we will get user's location
    }
    else {
        console.log("No geolocation Support");
    }
}
function showPosition(position){
    const userCoordinates = { //obj
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    // set the co-ordiantes into session storage: storing  as a form of string
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates); 

    console.log(userCoordinates.lat);
    console.log(userCoordinates.lon);  
   
}

let searchInput = document.querySelector("[data-searchInput]")
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "") 
        return;
    else
        fetchSearchWeatherInfo(cityName);

})

async function fetchSearchWeatherInfo(city) {
    LoadingScreen.classList.add("active"); // loader visible
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json(); //await till get the data
            LoadingScreen.classList.remove("active"); 
            // nned to show the location weather details
            userInfoContainer.classList.add("active"); 

            renderWeatherInfo(data);    
    }
    catch(err) {
        alert("location not found")
    }
}
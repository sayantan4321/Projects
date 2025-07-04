const userTab = document.querySelector("[data-userWeather");
const searchTab = document.querySelector("[data-searchWeather");
const weatherContainer = document.querySelector(".weather-container");

const grantlocationcontainer = document.querySelector(".grant-location-container");
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

function switchTab(clickedTab){
    // if i click on the tab where i am currently in so no need to anything
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab"); // removing details of clicking
        currentTab = clickedTab;
        currentTab.classList.add("current-tab"); // adding details of clicking

        if(!searchForm.classList.contains("active")){ // if searchform is not active, so we have to make it active
            // if its does not contains active class that means its not visible yet and we clicked means we want to make it visible.
            userInfoContainer.classList.remove("active"); //need to disable
            grantaccessContainer.classList.remove("active"); //need to disable
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
       grantlocationcontainer.classList.add("active");

    }
    else {
        const coOrdinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coOrdinates);
    }
}
async function fetchUserWeatherInfo(coOrdinates) {
    const {lat,lon} = coOrdinates;
    grantlocationcontainer.classList.romove("active"); // invisible this
    LoadingScreen.classList.add("active") // loader visible

    // API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await result.json();
    }
    catch(err) {
        
    }
}
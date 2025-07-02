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
    }    
}

// API CALL(internet call)
// this call should not call in main thread, cause all other processes will stop

// when it will happen?
// :when it can call the fetch method through a Async function
const API_KEY = "e22236e310220dddd4415abe79358d9a";

function renderWeatherInfo(data){ // append it to html body 
    let newPara = document.createElement('p'); // p tag used in html to show the temp details
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
    // data.main.temp ->not working

    document.body.appendChild(newPara);
}
async function fetchWeatherDetails() {
    try{
        let city= "goa";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        // wait till all data Fetched, dont went for below processing

        const data = await response.json();
        console.log(`weather data:` , data);
        renderWeatherInfo(data);
    }
    catch(err){
        // handle the error
        console.log("Error Found", err);
    }
}
async function putCustomWeatherDetails() {
    try{
        let latitude = 17.6333;
        let longitude = 18.3333; 
        
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        let data = await result.json();

        console.log(data);
        renderWeatherInfo(data);
    }
    catch(err){ // if co-ordinatesare wrong
      console.log("Error Found", err);
      
    }  
}
// classList will use to make active or deactivate the current tab to make other tab visible
// any of the tab will be clicked at first -> clickedTab (as it was a currenttab)

function switchTab(clickedTab) {
    apiErrorContainer.classList.remove("active");

    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){ // if searchform is not active, so we have to make it active
            // if its does not contains active class that means its not visible yet and we clicked means we want to make it visible.
            userInfoContainer.classList.remove("active"); //need to disable
            grantaccessContainer.classList.remove("active"); //need to disable
            searchForm.classList.add("active"); //need to enable
        }
        else{  // switching from search wearther to your weather
            searchForm.classList.remove("active"); 
            userInfoContainer.classList.remove("active");
            // getFromSessionStorage();
        }
    }
} 
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
    let lati = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lati);
    console.log(longi);  
    // now i can add the co-ordinate into the API, then we can call 
}


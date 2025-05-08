const inputSlider = document.querySelector("[data-lengthSlider]"); // syntax to fetch custom attributes
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[strength-indicator]");
const generateBtn = document.querySelector(".generate-btn");

const allCheckBox = document.querySelectorAll("input[type=checkbox]"); // fetch all checkboxes which are checked
const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

let password = "";
let passwordLength = 10; // default length of password
let checkboxCount = 0; // at starting one checkbox is checked
handleSlider();
setIndicator("#ccc") // set the color to grey at first

// steps: 
// 1. copyPassword()
// 2. handleSlider()
// 3. generatePassword()
// 4. updateIndicator() --> colour change based on strength(red, yellow, green)/grey
// 5. getRandomPassword(range) --> generate random password based on selected checkboxes
//    --> using combination of alphabets, numbers and symbols
// 6. calcStrength()

function handleSlider() {
    inputSlider.value = passwordLength; // set the value of slider to password length
    lengthDisplay.innerText = passwordLength; // set the value of length display to password length

    // to slide the cursor color till the min to current position value
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100 / (max -min)) + "% 100%";
}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRandomInterger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}
function getRandomNumber(){
    return getRandomInterger(0, 9);
}
function generateUppercase(){
    return String.fromCharCode(getRandomInterger(65, 91))
}
function generateLowercase(){
    return String.fromCharCode(getRandomInterger(97, 123))
}
function generateSymbol() {
    const randNum = getRandomInterger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false; // first check this conditions are checked or not
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;
    if(upperCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >=8) {
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNum || hasSymbol) && passwordLength >=6) {
        setIndicator("#ff0");
    }
    else setIndicator("#f00");
}    
// we habve a rightTest method to copy, and it works on Clipboard
// its returns a promise which will work as respond or reject [async function]
// with this async we will add await -> so till the time of copy it will wait and show the message copied(after completion of promise it will work)
async function copyPassword() {
   try {
     await navigator.clipboard.writeText(passwordDisplay.value)
     copyMsg.innerText = "copied"; // show in the span tag
   }
   catch(e) {
     copyMsg.innerText = "failed";  
   }
   // active class has generated in css
   copyMsg.classList.add("active"); // to make the span tag visible withthe message
   setTimeout(() => {
    copyMsg.classList.remove("active")
   }, 2000);
}

// adding eventListner to slider to change the value while sliding
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
}) 

// if value is there copy will work(or password length greater than 0)
copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value) copyPassword();
})



function handleCheckboxChange(){
   checkboxCount= 0
   allCheckBox.forEach((checkbox) => {
       if(checkbox.checked) checkboxCount++;
   });
   // condition: if paswordlength < checkboxCnt -> genarate password will be = checkboxCnt
   if(passwordLength < checkboxCount) {
      passwordLength = checkboxCount;
      handleSlider();
   }
}
allCheckBox.forEach((checkbox) => { // looping through all checkboxes
    checkbox.addEventListener('change', handleCheckboxChange); // whenever change will happen it will check the count
})

generateBtn.addEventListener('click', () => {
   // if nothing checked return
   if(checkboxCount == 0) return;
   
   if(passwordLength < checkboxCount) {
    passwordLength = checkboxCount;
    handleSlider();
   }
   // 1. remove old password
   password = "";

    // 2. will generate this with all the checked boxes marked
    // if(upperCaseCheck.checked) {
    //     password += generateUppercase();
    // }
    // if(lowerCaseCheck.checked) {
    //     password += generateLowercase();
    // }
    // if(numberCheck.checked) {
    //     password += getRandomNumber();
    // }
    // if(symbolCheck.checked) {
    //     password += generateSymbol();
    // }
    // but length is set to 10 then rest 6 position how to fill?
    // if this generate func r in an array then we call that function foreach position to fill the password
    //3. 
    function shufflePassword(array) {
       // Fisher yates Method
       for(let i=array.length -1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j]
        array[j] = temp;
       }
       let str = "";
       array.forEach((e) => (str += e));
       return str; // we can write the password outside if more functions need to use it
    }
    let funcArr = [];
    if(upperCaseCheck.checked) {
        funcArr.push(generateUppercase);
    }
    if(lowerCaseCheck.checked) {
        funcArr.push(generateLowercase);
    }
    if(numberCheck.checked) {
        funcArr.push(getRandomNumber);
    }
    if(symbolCheck.checked) {
        funcArr.push(generateSymbol);
    }
    // compulsary length
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    // remaining length
    for(let i=0; i<passwordLength - funcArr.length; i++){
        let randIdx = getRandomInterger(0, funcArr.length);
        password += funcArr[randIdx]();

    }
    // shuffle the password
    password = shufflePassword(Array.from(password));

    // display in UI
    passwordDisplay.value = password;
    // calculate strength
    calcStrength();

})
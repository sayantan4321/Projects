// console.log(parseInt(Math.random() * 100 + 1)); // to get the random number between 1 to 100
const randomNum = parseInt(Math.random() * 100 + 1);

const UserInput = document.querySelector('#guessfield');
const sunmit = document.querySelector('#sub');

const guessSlot = document.querySelector('.Guesses');
const remaining = document.querySelector('.LastResult');

const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas'); // if attemps are over last two lines Should not show 
// And user has to start over again

let prevGuess = []; // to store the prev answers
let numOfGuess = 1; // to store the number of guesses 

let PlayAgain = true; // to check if the user wants to play again

function validateGuess() {
  // validate the user input is lies under exact range or high or low
}    
function checkGuess() {
  // check the user input is same or not with the random number
}

function displayGuess() {

}    

function displayMessage(message) {
    // manupulate the DOM to display the message(reduce the counter)
}


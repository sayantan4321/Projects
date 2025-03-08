// console.log(parseInt(Math.random() * 100 + 1)); // to get the random number between 1 to 100
const randomNum = parseInt(Math.random() * 100 + 1);

const UserInput = document.querySelector('#guessfield');
const submit = document.querySelector('#sub');

const guessSlot = document.querySelector('.Guesses');
const remaining = document.querySelector('.lastResult');

const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas'); // if attemps are over last two lines Should not show 
// And user has to start over again
const p = document.createElement('p');

let prevGuess = []; // to store the prev answers
let numOfGuess = 1; // to store the number of guesses 

let PlayAgain = true; // to check if the user wants to play again


if(PlayAgain){
    submit.addEventListener('click', function(e){
        e.preventDefault(); // preventing other events
        const guess = parseInt(UserInput.value); // user input hold
        console.log(guess);
        validateGuess(guess);
    });
}
function validateGuess(guess) {
  // validate the user input is lies under exact range or high or low
  if(isNaN(guess)){
      alert('Please enter a valid number');
  } 
  else if(guess < 1){
      alert('Please enter a number greater than 1');
  }
  else if(guess > 100){
      alert('Please enter a number less than 100');
  }
  else{
      prevGuess.push(guess);
      if(numOfGuess === 10){
          displayGuess(guess);
          displayMessage('Game Over! You have used all 10 chances');
          displayMessage(`The random number is ${randomNum}`);
          endGame();
      }
      else{
            displayGuess(guess);
            checkGuess(guess);
      }
  }    
}    
function checkGuess(guess) {
  // check the user input is same or not with the random number
  if(guess === randomNum){
      displayMessage('Congratulations! You guessed it right');
      endGame();
  }
  else if (guess < randomNum){
      displayMessage('Too Low! Try again');
  }
  else if(guess > randomNum){
      displayMessage('Too High! Try again');
  }
}

function displayGuess(guess) {
   // update the guess array by adding the current number 
   UserInput.value = ''; // clear the input field
   guessSlot.innerHTML += `[${guess}]`;   
   numOfGuess++;
   remaining.innerHTML = `${11 - numOfGuess} remaining`;
}    

function displayMessage(message) {
    // manupulate the DOM to display the message(reduce the counter)
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// game end and new game start
function endGame() {
   UserInput.value = '';
   UserInput.setAttribute('disabled', ''); // using set Attribute -> it holds key value pair
   p.classList.add('button'); // it will behave like button
   p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
   startOver.appendChild(p);
   PlayAgain = false;
   newGame();
}
function newGame() { // that h2 line will work as button
    const newGame_button = document.querySelector('#newGame');
    newGame_button.addEventListener('click', function(e){
        randomNum = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numOfGuess = 1; // reset the values
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numOfGuess} remaining`;
        UserInput.removeAttribute('disabled'); // remove the disabled attribute which we put during endGame
        startOver.removeChild(p); // remove the button

        PlayAgain = true;
    });


}
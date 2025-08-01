const gameInfo = document.querySelector(".game-info");
const tictactoc = document.querySelector(".tic-tac-toc");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

// current player = X at first
// grid will be empty
// new game option will not been displayed

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// initialize the game 
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""]; // empty grid value at first

    //for a NewgGame start -> UI needs to be freshed with empty grids
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes.index.style.pointerEvents = "all";
         
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();


function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X"
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
        
                //check if winner is X
                if(gameGrid[position[0]] === "X") {
                    answer = "X";
                }
                else{
                    answer = "O";
                }
                // disable pointer events immidiately
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none"; // otherwise X and O both wins
                })
                //now need to highlight the boxes who wons
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });
    // so we have a winner now
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
}

// fill X or O depends on current user 
function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; // UI update
        gameGrid[index] = currentPlayer // initGame array value update
        
        boxes[index].style.pointerEvents = "none"; // once marked no more clicks
        swapTurn();
        checkGameOver();
    }
}
 
boxes.forEach((box, index) => { //all 9 divs will itarate
    box.addEventListener("click", () => { 
        handleClick(index); // function to understand on which div what is clicked
    })
});



 

/*
Store game status element here to allow use later on
*/
const statusDisplay = document.querySelector('.game--status');
/*
Here we declare some variables that we will use to track
game status
*/
/* Use gameActive to pause game in case of end scenario */
let gameActive = true;
/* Store current player here, so we know whose turn */
let currentPlayer = "X";
/* We will store our current game state here, the forms of emppty 
strings in an array will allow us to easily track played cells and 
validate the game state later on */
let gameState = ["", "", "", "", "", "", "", "", ""];
/* Here we have declared some messages we will display to the user
during the game, Since we have some dynamic factors in those messages,
namely the current player, we have declared them as functions, so that
the actual messages gets created with current data every time we need it */
const winningMessage = () => 'Player ${currentPlayer} has won!';
const drawMessage = () => 'Game ended in a draw!';
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
/* 
We set the initial message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed() {

}
function handlePlayerChange() {

}
function handleResultValidation() {

}
function handleCellClick() {

}
function handleRestartGame() {

}
/* And finally we add our event listeners to the actual game cells, as well as our
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener ('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

/* Handle Cell CLick */
function handleCellClick(clickedCellEvent) {
/* we will save the clicked html element in a variable for easier use */
    const clickedCell = clickedCellEvent.target;
/* Here we grab the 'data-cell-index' attributes from the clicked cell 
to identify where that cell is in our grid
Please note that the get Attribute will return a string value, since we need
an actual number, we parse it into an integer (number)
*/
    const clickedCellIndex = parseInt (
        clickedCell.getAttribute('data-cell-index')
    );
/* Next we check wether the call has already been played, or if the game is paused.
If either of those is true we will simply ignore the click. */
    if (gameState[clickedCellIndex]!== "" || !gameActive)  {
        return;
    }
/* If everything if in order we will proceed with the game flow */
    handleCellPlayed(clickedCell, clickedCellIndex);
}

/*handleCellPlayed*/
function handleCellPlayed(clickedCell, clickedCellIndex){
/* We update our internal game state to reflect the played move, as well as update
the user interface to reflect the played move */
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

/* handleResultValidation */

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
/* 
We will check wether there are any values in our game state array 
that are still not populated with a player sign
*/
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
/*
If we get to here we know that the no one won the game yet, 
and that there are still moves to be played, so we continue by changing the current player.
*/
    handlePlayerChange();
}
/*HandlePlayerChange*/
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
/*HandleRestartGame*/
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}
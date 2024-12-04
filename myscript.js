// Gameboard IIFE
const Gameboard = (() => {
    // Initialize the gameboard
    // const board = Array(9).fill(null);

    // Integrating with the DOM
    const board = [];
    board[0] = 'X'; 
    board[1] = 'O'; 
    board[2] = 'X'; 
    board[3] = 'O'; 
    board[4] = 'X'; 
    board[5] = null;
    board[6] = null;
    board[7] = 'O'; 
    board[8] = null;

    // Place mark
    const placeMark = (index, mark) => {
        if (board[index] === null) {
            board[index] = mark;
            return true;
        } else {
            return false;
        }
    };

    // Reset the board
    const resetBoard = () => {
        board.fill(null);
    }

    // Get Current state of the board
    const getBoard = () => board;

    return { placeMark, resetBoard, getBoard };
})();



// Player Objects
const Player = (name, mark) => {
    return { name, mark };
};



// Game Controller IIFE
const GameController = (() => {
    let currentPlayer;
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    // Winning Condition 
    const winningCombination = [
        [0,1,2], // row 1
        [3,4,5], // row 2
        [6,7,8], // row 3
        [0,3,6], // column 1
        [1,4,7], // column 2
        [2,5,8], // column 3
        [0,4,8], // diagonal 1
        [2,4,6] // diagonal 2
    ]

    // Check for wins
    const checkwins = (game) => {
        for (const combination of winningCombination) {
            const [a,b,c] = combination;
            // Check for winning condition 
            if(game[a] && (game[a] === game[b]) && (game[a]===game[c])) {
                return game[a];
            }
        }
        return null; // No winners
    } 

    // Check for draws
    const checkdraws = (game) => {
        return game.every(cell => cell != null); //Return true if no empty cell is detected
    }

    const handleClick = (index) => {
        // Place Mark on the board
        const placeMark = Gameboard.placeMark(index, currentPlayer.mark);

        // Get the current state of the game
        let game = Gameboard.getBoard();  

        // Check for winner
        const winner = checkwins(game);
        if (winner) {
            console.log(`Winner is ${winner}`)
        }

        // Check for draws
        const draws = checkdraws(game);
        if (draws) {
            console.log(`It is a draw!`);
        }

        // Validate the mark 
        if (placeMark){
            // Switich Player 
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        } else {
            // Remaing the same player since the input is invalid 
            console.log(`Wrong Place. Please re-enter your input`);
        }
    };   


    // Reset the game 
    const startGame = () => {
        currentPlayer = player1;
        Gameboard.resetBoard();
    }

    return { startGame, handleClick };
})();



// Play the game on the page

// Step 1: GameController.startGame()
const playGame = () => {
    // Start the game
    // GameController.startGame();

    // Display the current gameboard on DOM
    gameboard(Gameboard.getBoard());
}

// Render the contents of the gameboard array to the webpage
function gameboard(board) {
    // Debugging line
    console.log(board);

    // Update the innerHTML with a loop
    for (const index of board.keys()) {
        // Get the DOM
        const cell = document.querySelector(`.gameboard td[data-index="${index}"]`);

        // Ensure the cell exists
        if (cell) {
            cell.innerHTML = board[index]; // Update the innerHTML
        } else {
            console.log(`Cell ${index} does not exist`)
        }
    }
}


// Game start
playGame()



// Step 2: Player 1 turn: GameController.handleClick(index)

// Step 3: Player 2 turn: GameController.handleClick(index) 

// Step 4: Repeat step 2,3 until a draw or a win
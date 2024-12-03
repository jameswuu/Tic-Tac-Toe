// Gameboard IIFE
const Gameboard = (() => {
    // Initialize the gameboard
    const board = Array(9).fill(null);

    // Place mark
    const placeMark = (index, mark) => {
        if(board[index] === null) {
            board[index] = mark;
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
        // let draw = true;
        // for (let cell of game) {
        //     if (cell === null) {
        //         draw = false;
        //         break; // Cell is yet to be filled 
        //     }
        // }
        // return draw;

        // Codes can be simplified as:
        return game.every(cell => cell != null); //Return true if no empty cell is detected
    }

    const handleClick = (index) => {
        // Place Mark on the board
        Gameboard.placeMark(index, currentPlayer.mark);

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
            console.log(`Draws`);
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };   


    // Reset the game 
    const startGame = () => {
        currentPlayer = player1;
        Gameboard.resetBoard();
    }

    return { startGame, handleClick };
})();
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

    // Reset the game 
    const startGame = () => {
        currentPlayer = player1;
        Gameboard.resetBoard();
    }

    const handleClick = (index) => {
        Gameboard.placeMark(index, currentPlayer.mark);
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    return { startGame, handleClick };
})();
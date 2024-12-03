// Encapsulate the game 
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


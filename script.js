const allSquares = document.querySelectorAll('[data-square]');
const winnerText = document.querySelector('#winner');
const resetBtn = document.querySelector('#reset');

const PlayerFactory = (name, sign) => {
    return {name, sign};
}

const player1 = PlayerFactory("Player 1", "X");
const player2 = PlayerFactory("Player 2", "O");

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];


    let winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    let isPlayer1 = true;
    let numOfMoves = 0;

    const resetBoard = () => {
        allSquares.forEach(square => {
            square.innerHTML = "";
            for (let i = 0; i < board.length; i++) {
                board[i] = "";
            }
        })
        winnerText.textContent = "";
        isPlayer1 = true;
        numOfMoves = 0;
    }

    const checkGameWinner = () => {
        for (let i = 0; i < winningPatterns.length; i++) {

            if (checkWinX(winningPatterns[i])) {
                winnerText.textContent = "Player 1 Wins (X)"
            }
            if (checkWinO(winningPatterns[i])) {
                winnerText.textContent = "Player 2 Wins (O)"
            }
        }
    }

    const checkWinX = pattern => {
        return pattern.every(index => board[index] === "X");
    }

    const checkWinO = pattern => {
        return pattern.every(index => board[index] === "O");
    }

    
    const setSquare = (square) => {
        if (!square.hasChildNodes()) {
            square.textContent = isPlayer1 ? player1.sign : player2.sign;
            numOfMoves++;
            setBoardArr(square.getAttribute('data-square'));
            switchTurn();
        }

        if (numOfMoves === 9) {
            winnerText.textContent = "It's a Draw"
        }

        checkGameWinner();
    }

    const switchTurn = () => {
        isPlayer1 = !isPlayer1;
    }

    const setBoardArr = (index) => {
        board[index] = isPlayer1 ? player1.sign: player2.sign;
    }
    return {setSquare, resetBoard};
})();


allSquares.forEach(square => {
    square.addEventListener('click', () => {
        gameBoard.setSquare(square);
    });
});

resetBtn.addEventListener('click', () => {
    gameBoard.resetBoard();
})
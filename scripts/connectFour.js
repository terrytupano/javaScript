const ROW_LENGTH = 7;
const WIN_IN_A_ROW = 4;
var currentPlayer
const squares = new Array();

// expresed in [x, y] corrdenates system 
let directionMatrix = [
    [-1, 1], [0, 1], [1, 1],
    [-1, 0], [1, 0], // [0,0 direcction is not valied]
    [-1, -1], [0, -1], [1, -1]
];

/**
 * this method is called on click action on every div element inside the grid. this method chekc if the current element is 
 * available to be taked by the player.
 * 
 * TODO: only allow play in correct coordenate. future inprovement allow column selection 
 * 
 */
function squareClick() {
    const square = this;
    var row = Number.parseInt(square.getAttribute("row"));
    var col = Number.parseInt(square.getAttribute("column"));

    var id = (row + 1) + "-" + col;
    const nextSquare = document.getElementById(id);
    if (!square.classList.contains("taken") && (row == ROW_LENGTH - 1 || nextSquare.classList.contains("taken"))) {
        square.classList.add("taken");
        square.classList.add(currentPlayer);
        setTimeout(() => {
            if (checkPlayerWon()) {
                alert(currentPlayer + " WINS !!!");
            } else {
                currentPlayer = currentPlayer == "playerBlack" ? "playerRed" : "playerBlack";
                document.getElementById("current_Player").innerHTML = currentPlayer;
            }
        }, 100);
    } else {
        alert("cant go there");
    }
}

/**
 * this method check if the current Player has won the match. Only the current player (player stored in gloval variable 
 * currentPlayer) is evaluated
 * 
 * @returns true if current player has won, false otherwise
 */
function checkPlayerWon() {
    for (let square of squares) {
        // only process taken elements by the current player
        if (!(square.classList.contains("taken") && square.classList.contains(currentPlayer)))
            continue;

        for (let coord of directionMatrix) {
            var numMatches = 1; // the current position count
            var row = Number.parseInt(square.getAttribute("row"));
            var col = Number.parseInt(square.getAttribute("column"));
            var nextSquare = null;
            for (var i = 0; i < WIN_IN_A_ROW; i++) {
                col += coord[0];
                row += coord[1];
                nextSquare = document.getElementById(row + "-" + col);
                if (nextSquare != null && nextSquare.classList.contains("taken") && nextSquare.classList.contains(currentPlayer)) {
                    numMatches += 1;
                }
            }
            // If our count reaches 4, the player has won the game
            if (numMatches == WIN_IN_A_ROW) {
                return true;
            }
        }
    }
    // If we reach this statement: they have NOT won the game
    return false;
}

/**
 * game init. create the grid and init the gloval variables
 * 
 */
document.addEventListener("DOMContentLoaded", () => {
    const restult = document.querySelector("#result");
    const grid = document.querySelector(".grid");
    // posibles values for currentplayer: playerBlack playerRed
    currentPlayer = "playerBlack";
    // create the grid
    for (let row = 0; row < ROW_LENGTH; row++) {
        for (let col = 0; col < ROW_LENGTH; col++) {
            const square = document.createElement("div");
            square.setAttribute("row", row);
            square.setAttribute("column", col);
            square.setAttribute("id", row + "-" + col);
            square.addEventListener("click", squareClick);
            grid.appendChild(square);
            squares.push(square);
        }
    }
});

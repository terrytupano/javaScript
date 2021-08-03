const ROW_LENGTH = 7;
const WIN_IN_A_ROW = 4;
var currentPlayer
const squares = new Array();

// expresed in [x, y] corrdenates system 
let directionMatrix = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [0, 0], [0, 1],
    [-1, 1], [0, 1], [1, 1]
];

document.addEventListener("DOMContentLoaded", () => {
    const restult = document.querySelector("#result");
    const grid = document.querySelector(".grid");
    // posibles values for currentplayer: playerBlack playerRed
    currentPlayer = "playerBlack";
    // create the crid
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

function squareClick() {
    const square = this;
    var row = Number.parseInt(square.getAttribute("row"));
    var col = Number.parseInt(square.getAttribute("column"));

    // TODO: only allow play in correct coordenate. future inprovement allow column selection 
    var id = (row + 1) + "-" + col;
    const nextSquare = document.getElementById(id);
    if (row == ROW_LENGTH - 1 || (nextSquare != null && nextSquare.classList.contains("taken"))) {
        square.classList.add("taken");
        square.classList.add(currentPlayer);

        //TODO: temporal
        checkPlayerWon();

        currentPlayer = currentPlayer == "playerBlack" ? "playerRed" : "playerBlack";
        // TODO: inprove  name
        document.getElementById("current_Player").innerHTML = currentPlayer;

    } else {
        alert("cant go there");
    }
}

/**
 * check and notify when a playeer has won the match
 * 
 */
function checkPlayerWon() {
    for (let square of squares) {
        // only precess taken elements by the current player
        if (!square.classList.contains("taken") || square.classList.contains(currentPlayer))
            continue;

        // the current chip is a macht
        var numMatches = 1;
        var row = Number.parseInt(square.getAttribute("row"));
        var col = Number.parseInt(square.getAttribute("column"));

        for (let coord of directionMatrix) {
            //            console.log(`coord: ${row} ${col} numMatches: ${numMatches}`);
            for (var i = 0; i < WIN_IN_A_ROW; i++) {
                col += coord[0];
                row += coord[1];
                const nextSquare = document.getElementById(row + "-" + col);
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
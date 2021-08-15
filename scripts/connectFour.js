const ROW_LENGTH = 7;
const WIN_IN_A_ROW = 4;
var currentPlayer
const squares = new Array();
const appValuesList = new Array();
// expresed in [x, y] corrdenates system 
let directionMatrix = [
    [-1, 1], [0, 1], [1, 1],
    [-1, 0], [1, 0], // [0,0 direcction is not valid]
    [-1, -1], [0, -1], [1, -1]
];

/**
 * this function is invoque onInput event for the <form> section. this method enabled/disabled input components acording 
 * to the user interaction.
 * 
 */
function onInput() {
    const errMsg = document.getElementById("form.msgText");
    errMsg.classList.remove("errMsg");
    //  errMsg.classList.add("errMsg");

    const selets = document.getElementById("gameType");
    const val = selets.options[selets.selectedIndex].value;
    const fp = ("" + val).substr(0, 1);
    const sp = ("" + val).substr(2, 1);

    // enable input only for Human players
    document.getElementById("name1").disabled = !(fp == "H");
    document.getElementById("name2").disabled = !(sp == "H");

    //human Vs Machine
    if (sp != "H" && sp != "") {
        var pna = "" + selets.options[selets.selectedIndex].innerHTML;
        var i = 4 + pna.indexOf("-vs-");
        const v = document.getElementById("name2");
        v.value = pna.substr(i).trim();
    }

}

/**
 * this method is invoked when the user click Star game button. if all parameters are set, this method enalble the game table 
 * and the game beging, when not, this method show a errr message.
 * 
 */
function onSubmit() {
    const errMsg = document.getElementById("example3.errMsg");
    errMsg.classList.remove("errMsg");

    const selets = document.getElementById("gameType");
    const val = selets.options[selets.selectedIndex].value;

    // no game type selected
    if (val == "") {
        errMsg.innerHTML = "Sellect a game type.";
        errMsg.classList.add("errMsg");
        return;
    }

    // name is mandatory
    if (document.forms["myForm"]["name1"].value == "") {
        errMsg.innerHTML = "The Player(s) name muss be filled";
        errMsg.classList.add("errMsg");
        return;
    }

    // at this point cann start the game

}


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
document.addEventListener("DOMContentLoaded", () => {
    const restult = document.querySelector("#result");
    const grid = document.querySelector(".game.grid");
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
 */

/**
   * this is the function entry point called in documento.onLoad event
   */
function init() {
    // appValuesList contain varios messages and gloval values
    appValuesList["game.msgtext.title"] = "Connect 4 is waiting for you.";
    appValuesList["game.msgtext.currentP"] = "The currnet player ist <playerName>.";
    appValuesList["form.msgText"] = "Please select game type, fill the names and press <b>Start</b>";

    document.getElementById("form.msgText").innerHTML = appValuesList["form.msgText"];
    document.getElementById("game.msgText").innerHTML = appValuesList["game.msgtext.title"];

    // fill the input combobox whit all available gametype. 
    const gamet = document.getElementById("gameType");
    var option = document.createElement("option");
    option.setAttribute("value", "HvR");
    option.innerHTML = "Human -vs- Random Player";
    gamet.appendChild(option);

    // create the gridtable
    const restult = document.querySelector("#result");
    const grid = document.querySelector(".game.grid");
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
}

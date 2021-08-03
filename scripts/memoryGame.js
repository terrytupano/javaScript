const cardsObject = [{
    name: "3dGlases",
    image: "images/3d_glasses.png"
}, {
    name: "32bit",
    image: "images/32_bit.png"
}, {
    name: "64bit",
    image: "images/64_bit.png"
}, {
    name: "abacus",
    image: "images/abacus.png"
}];

var cardArray = cardsObject.concat(cardsObject);
cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector(".grid");
var cardChosen = [];
var cardChosenId = [];
var cardsWon = [];
var resultText = document.getElementById("resultText");

/**
 * load the content of the page on ???
 */
function contentLoad() {

}

/**
 * create the grid of cards on the .grid class element
 */
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement("img");
        card.setAttribute("src", "images/back.png");
        card.setAttribute("cardId", i);
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    }
}

function checkForMacth() {
    var cards = document.querySelectorAll("img");
    var car1 = cardChosenId[0];
    var car2 = cardChosenId[1];
    if (cardChosen[0] == cardChosen[1]) {
        alert("You found a math");
        cards[car1].setAttribute("src", "images/empty.png");
        cards[car2].setAttribute("src", "images/empty.png");
        cardsWon.push(cardChosen);
    } else {
        cards[car1].setAttribute("src", "images/back.png");
        cards[car2].setAttribute("src", "images/back.png");
    }
    cardChosen = [];
    cardChosenId = [];
    resultText.textContent = cardsWon.length;
    if (cardsWon.length == cardArray.length / 2) {
        resultText.textContent = "Congratualations you won";
    }
}

function flipCard() {
    var cardId = this.getAttribute("cardId");
    cardChosen.push(cardArray[cardId].name);
    cardChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].image);
    if (cardChosen.length == 2) {
        setTimeout(checkForMacth, 500);
    }

}
//document.addEventListener("DOMContentLoaded", contentLoad);
createBoard();

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#timeLeft");
var score = document.querySelector("#score");
var hitPosition;
var result = 0;
var updateMole, updateTimer;

function randomSquare() {
    // remove the element mole from the class list
    squares.forEach(square => {
        square.classList.remove("mole");
    });

    // set a random element and add the mole ccs class to the list
    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add("mole");
    hitPosition = randomSquare.id;
}

/**
 * update the timeleft 
 * 
 */
function updateTimeLeft() {
    let curt = Number.parseInt(timeLeft.textContent);
    curt--;
    timeLeft.textContent = curt;
    if (curt == 0) {
        clearInterval(updateMole);
        clearInterval(updateTimer);
        alert("Game Over");
    }
}


/**
 * add mouseListener to each square
 */
squares.forEach(square => {
    square.addEventListener("mouseup", () => {
        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
        }
    });
});

updateMole  = setInterval(randomSquare, 400);
updateTimer = setInterval(updateTimeLeft, 1000);
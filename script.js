let number, attempts, maxRange;

let score = 0;

let highScore = Number(localStorage.getItem("highScore")) || 0;

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBtn = document.getElementById("modalBtn");

document.getElementById("score").innerText = score;
document.getElementById("highScore").innerText = highScore;

document
    .getElementById("difficulty")
    .addEventListener("change", startGame);

modalBtn.addEventListener("click", () => {

    modal.style.display = "none";

    startGame();
});

function startGame() {

    let difficulty =
        document.getElementById("difficulty").value;

    if (difficulty === "easy") {

        maxRange = 20;
        attempts = 5;
    }

    else if (difficulty === "medium") {

        maxRange = 50;
        attempts = 4;
    }

    else {

        maxRange = 100;
        attempts = 3;
    }

    number =
        Math.floor(Math.random() * maxRange) + 1;

    document.getElementById("info").innerText =
        `Guess between 1 to ${maxRange} | Attempts: ${attempts}`;

    document.getElementById("result").innerText = "";

    document.getElementById("guessInput").value = "";

    document.getElementById("guessInput").disabled = false;
}

function checkGuess() {

    let guess =
        Number(document.getElementById("guessInput").value);

    let result =
        document.getElementById("result");

    if (guess === 0 || isNaN(guess)) {

        result.innerText = "Enter a valid number!";

        return;
    }

    if (attempts <= 0) {

        result.innerText = "Game Over! Restart";

        return;
    }

    attempts--;

    if (guess === number) {

        score++;

        document.getElementById("score").innerText = score;

        if (score > highScore) {

            highScore = score;

            localStorage.setItem("highScore", highScore);

            document.getElementById("highScore").innerText =
                highScore;
        }

        result.innerText = "You Win!";

        document.getElementById("guessInput").disabled = true;

        modal.style.display = "flex";

        modalTitle.innerText = "You Won!";

        modalBtn.innerText = "Play Again";

        return;
    }

    else if (guess > number) {

        result.innerText =
            `Too High! Attempts left: ${attempts}`;
    }

    else {

        result.innerText =
            `Too Low! Attempts left: ${attempts}`;
    }

    if (attempts === 0) {

        result.innerText =
            `You Lost! Number was ${number}`;

        score = 0;

        document.getElementById("score").innerText = score;

        document.getElementById("guessInput").disabled = true;

        modal.style.display = "flex";

        modalTitle.innerText =
            `You Lost! Number was ${number}`;

        modalBtn.innerText = "Try Again";
    }

    document.getElementById("guessInput").value = "";
}

function restartGame() {

    startGame();
}
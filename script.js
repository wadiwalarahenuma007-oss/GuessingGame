let number, attempts, maxRange;
let score = localStorage.getItem("score") || 0;

document.getElementById("score").innerText = score;

document.getElementById("difficulty").addEventListener("change", startGame);

function startGame() {
    let difficulty = document.getElementById("difficulty").value;

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

    number = Math.floor(Math.random() * maxRange) + 1;

    document.getElementById("info").innerText =
        `Guess between 1 to ${maxRange} | Attempts: ${attempts}`;

    document.getElementById("result").innerText = "";
    document.getElementById("guessInput").value = "";
}

function checkGuess() {
    let guess = Number(document.getElementById("guessInput").value);
    let result = document.getElementById("result");

    if (!guess) {
        result.innerText = "Enter a number!";
        return;
    }

    if (attempts <= 0) {
        result.innerText = "Game Over! Click Restart";
        return;
    }

    attempts--;

    if (guess === number) {
        score++;
        localStorage.setItem("score", score);
        document.getElementById("score").innerText = score;

        result.innerText = "You Win!";
    }
    else if (guess > number) {
        result.innerText = `Too High! Attempts left: ${attempts}`;
    }
    else {
        result.innerText = `Too Low! Attempts left: ${attempts}`;
    }

    if (attempts === 0 && guess !== number) {
        result.innerText = `You Lost! Number was ${number}`;
    }

    document.getElementById("guessInput").value = "";
}

function restartGame() {
    startGame();
}
startGame();
// - Create a list of words
var wordArray = ["Mercedes", "Jaguar", "Mclaren", "Ferrari", "Porshe", "Tesla"]

// - Options for user to choose
var alphabet = "abcdefghijklmnopqrstuvwxyz"

// - Remaining guesses from user until game over
var guessCounter = 0

// - All letters already guessed by user
var lettersGuessed = []

// - Store word chosen by the generator
var chosenWord = ""

// - Array for answer blanks
var answer = []

// - Game Status
var gameStarted = false

// - Number of Wins and Losses
var wins = 0
var losses = 0

// - Displaying to user
var showWord = document.getElementById("display-words")
var showLetters = document.getElementById("letters")
var showGuessCounter = document.getElementById("guess-counter")
var showWins = document.getElementById("wins")
var showLosses = document.getElementById("losses")
var startKey = document.getElementById("start-key")

// # Start/Play the game!
document.onkeyup = function (event) {
    var userGuess = event.key.toLowerCase()

    // - New Game
    if (gameStarted === false) {
        start()
    }
    // - Game has started
    else {

        if (gameStarted === true) {

            // - Determine if letter was already guessed
            if (alphabet.includes(userGuess)) {

                // - Shows player the letter choice that has already been used
                if (lettersGuessed.includes(userGuess) || lettersGuessed.includes(userGuess.toUpperCase())) {
                    alert("You already guessed " + userGuess + "! Try a different one!")
                }
                // - 
                else {
                    lettersGuessed.push(userGuess.toUpperCase())
                    showLetters.innerHTML = lettersGuessed
                    guessCounter--
                }

                for (i = 0; i < chosenWord.length; i++) {
                    if (chosenWord[i] === userGuess) {
                        answer[i] = userGuess
                        showWord.innerHTML = answer.join(" ")
                    }
                }

            }

            // # Lose game if you run out of guesses
            if (guessCounter === 0) {
                alert("GAME OVER! YOU'RE STUCK WITH THAT OLD CAR!")
                losses++
                startKey.innerHTML = "<style>visibility: visible</style> Press any key to play again!"
                gameStarted = false
            }
            // # Win game if all letters guessed correctly
            else if (!answer.includes("_")) {
                alert("CONGRATULATIONS! YOU WIN A NEW CAR!")
                wins++
                startKey.innerHTML = "<style>visibility: visible</style> Press any key to play again!"
                gameStarted = false
            }
            showLosses.innerHTML = losses
            showWins.innerHTML = wins
            showGuessCounter.innerHTML = guessCounter
        }
    }
}

// - Function randomly picks any car from the wordArray
var wordGenerator = function () {
    word = wordArray[Math.floor(Math.random() * wordArray.length)].toLowerCase()
    return word
}

var start = function () {
    gameStarted = true
    answer = []
    lettersGuessed = []
    showLetters.innerHTML = lettersGuessed
    chosenWord = wordGenerator()
    for (i = 0; i < chosenWord.length; i++) {
        answer[i] = "_"
    }
    showWord.innerHTML = answer.join(" ")
    guessCounter = 10
    showGuessCounter.innerHTML = guessCounter
    startKey.innerHTML = "<style>visiblity: hidden</style>"
}
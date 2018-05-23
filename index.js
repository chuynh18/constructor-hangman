var Word = require("./word.js");
var inquirer = require("inquirer");

// context:  https://www.youtube.com/watch?v=XziLNeFm1ok (as if you needed it)
var index =  {
    dictionary: [
    "Star War The Third Gathers",
    "Backstroke of the West",
    "Mr. Speaker, we are for the big",
    "Batter to death them",
    "The nobody greets",
    "I am uninterested to politics",
    "Smelly boy",
    "The geography that I stands compares you superior",
    "You are a sacrifice article that I cut up rough now",
    "Do not send out the air tank why",
    "Do not want",
    "Did you heard of the tragedy that reach the man",
    "Reaching the man cloth space is the emperor",
    "I would be aller strong and big than anyone",
    "I have seen the true facts of pure hero's ground",
    "To me heros is just bad person",
    "Friend you are crazy"],
    guesses: 9,
    wins: 0,
    losses: 0,
    guessedThisRound: [],
    pushGuess: function(letter) {
        index.guessedThisRound.push(letter);
    },
    currentWordString: "",
    currentWord: {},
    selectWord: function() {
        this.currentWordString = this.dictionary[Math.floor(Math.random()*this.dictionary.length)];
    },
    makeWordObject: function(input) {
        this.currentWord = new Word(input);
    },
    showStats: function() {
        console.log("\nGuesses remaining: " + index.guesses + "\nLetters you've guessed: " + index.guessedThisRound + "\n\n");
    },
    numOfBlanks: 0,
    updateNumOfBlanks: function() {
        this.numOfBlanks = 0;
        this.currentWord.wordArray.forEach((element) => {
            if (!element.isGuessed) {
                this.numOfBlanks++;
            };
        });
    },
    checkGuess: function() {
        var blanks = 0;
        this.currentWord.wordArray.forEach((element) => {
            if (!element.isGuessed) {
                blanks++;
            };
        });
        if (blanks === this.numOfBlanks) {
            return false;
        }
        else {
            this.updateNumOfBlanks();
            return true;
        };
    }
};

var startGame = function() {
    inquirer
    .prompt([
        {
            type: "confirm",
            message: "ARE YOU READY TO RUMBLE?!?!?!",
            name: "confirm",
            default: true
          }
    ])
    .then(function(response) {
        if (response.confirm) {
            console.log("GREAT!\n");
            index.guesses = 9;
            index.guessedThisRound = [];
            index.selectWord();
            index.makeWordObject(index.currentWordString);
            index.currentWord.wordSplitter(index.currentWordString);
            index.currentWord.checkGuess("");
            index.showStats();
            index.currentWord.displayWord();
            index.updateNumOfBlanks();
            guessLetter();
        }
        else if (!response.confirm) {
            console.log("Either you slam with the best or you jam with the rest.  Looks like you're content jamming with the rest.");
        }
    })
}

var guessLetter = function() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "Guess a letter.",
            name: "guessingGame"
          }
    ])
    .then(function(response) {
        if (["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].indexOf(response.guessingGame.toLowerCase()) !== -1) {
            index.currentWord.checkGuess(response.guessingGame.toLowerCase());
            if (index.guessedThisRound.indexOf(response.guessingGame.toLowerCase()) !== -1) {
                console.log("\nYou've already guessed the letter " + response.guessingGame + " this round!  Try again!");
                index.showStats();
                index.currentWord.displayWord();
                guessLetter();
            }
            else if (index.checkGuess()) {
                console.log("\nGreat guess!");
                index.guessedThisRound.push(response.guessingGame.toLowerCase());
                if (index.numOfBlanks > 0) {
                    index.showStats();
                    index.currentWord.displayWord();
                    guessLetter();
                }
                else {
                    console.log("");
                    index.currentWord.displayWord();
                    console.log("\nCongratulations!  You won!")
                    index.wins++;
                    console.log("Wins: " + index.wins +", losses: " + index.losses);
                    startGame();
                };
            }
            else if (!index.checkGuess()) {
                index.guesses--;
                console.log("\nNope!  That's a miss!");
                if (index.guesses === 0) {
                    index.losses++;
                    console.log("Sorry, you have lost this one.  The phrase you were trying to guess was...\n");
                    index.currentWord.displayWordAnyway();
                    console.log("\nWins: " + index.wins +", losses: " + index.losses);
                    startGame();
                }
                else {
                    index.guessedThisRound.push(response.guessingGame.toLowerCase());
                    index.showStats();
                    index.currentWord.displayWord();
                    guessLetter();
                };
            };
        }
        else {
            console.log("\nInvalid input.  Try again!");
            index.showStats();
            index.currentWord.displayWord();
            guessLetter();
        };
    });
};

startGame();
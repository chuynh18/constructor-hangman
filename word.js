var Letter = require("./letter.js");

var Word = function(word) {
    this.word = word;
    this.letter = Letter;
    this.wordSplitter = (input) => {
        input.split("").forEach((element) => {
            this.wordArray.push(new Letter(element));
        });
    };
    this.wordArray = [];
    this.displayWord = () => {
        var wordInProgress = "";
        this.wordArray.forEach((element) => {
            if (!element.isGuessed) {
                wordInProgress += "_ ";
            }
            else if (element.isGuessed) {
                wordInProgress += element.letter + " ";
            };
        });
        console.log(wordInProgress);
    };
    this.checkGuess = (letter) => {
        this.wordArray.forEach(function(element) {
            element.checkGuess(letter);
        });
    };
};

// var guessTheWord = new Word("Backstroke of the West");
// guessTheWord.wordSplitter(guessTheWord.word);
// guessTheWord.checkGuess("");
// guessTheWord.displayWord();
// guessTheWord.checkGuess("K");
// guessTheWord.displayWord();

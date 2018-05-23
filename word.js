"use strict";

var Letter = require("./letter.js");

var Word = function() {
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
    this.displayWordAnyway = () => {
        var wordInProgress = "";
        this.wordArray.forEach((element) => {
            wordInProgress += element.letter + " ";
        });
        console.log(wordInProgress);
    };
    this.checkGuess = (letter) => {
        this.wordArray.forEach(function(element) {
            element.checkGuess(letter);
        });
    };
};

module.exports = Word;
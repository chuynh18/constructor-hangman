var Letter = function(letter) {
    this.letter = letter;
    this.isGuessed = false;
    this.renderLetter = function() {
        if (this.isGuessed) {
            return this.letter;
        }
        else if (!this.isGuessed) {
            return "_";
        };
    };
    this.checkGuess = function(x) {
        if (this.letter === " " || this.letter === "," || this.letter === "'") {
            this.isGuessed = true;
        };
        if (this.letter === x.toLowerCase() || this.letter === x.toUpperCase()) {
            this.isGuessed = true;
        };
    };
};

module.exports = Letter;
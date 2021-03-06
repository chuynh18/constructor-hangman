"use strict";

var Word = require("./word.js");
var inquirer = require("inquirer");

// context:  https://www.youtube.com/watch?v=XziLNeFm1ok (as if you needed it)
var index =  {
    dictionary: [
    "Star War The Third Gathers",
    "Backstroke of the West",
    "Game time started",
    "Our dichotomy opens the combat",
    "Mr. Speaker, we are for the big",
    "Superior, they have escaped a day after the fair",
    "Batter to death them",
    "First aid airship",
    "The nobody greets",
    "Etc. , it is your idea that one of this rescue",
    "I am uninterested to politics",
    "Is you saved I return to carry on the back me a dangerous",
    "Smelly boy",
    "I beat the intelligence bureau the telephone",
    "Put the gold with the D of two together very dangerous",
    "The geography that I stands compares you superior",
    "I can be then academic association this kind of magic",
    "The wish power are together with you at",
    "You are a sacrifice article that I cut up rough now",
    "You are the governor of this city",
    "Looking me am a civilization person",
    "The knowledge of the dark of the study hopeless in the fire of water",
    "Do not send out the air tank why",
    "Do not want",
    "Did you heard of the tragedy that reach the man",
    "Reaching the man cloth space is the emperor",
    "I would be aller strong and big than anyone",
    "I have seen the true facts of pure hero's ground",
    "To me heros is just bad person",
    "Friend you are crazy",
    "Reaching the west of reaches",
    "Become the empire of the first choice",
    "Talent extrication child",
    "I must leave the country",
    "D the superior is a bad person",
    "To, all councilmans whole republic"],
    guesses: 9,
    wins: 0,
    losses: 0,
    guessedThisRound: [],
    pushGuess: function(letter) {
        this.guessedThisRound.push(letter);
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
        console.log("\nGuesses remaining: " + this.guesses + "\nLetters you've guessed: " + this.guessedThisRound + "\n\n");
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
    },
    updateDisplay: function() {
        this.showStats();
        this.currentWord.displayWord();
        guessLetter();
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
            console.log("\n ██████╗ ██████╗ ███████╗ █████╗ ████████╗██╗\n██╔════╝ ██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║\n██║  ███╗██████╔╝█████╗  ███████║   ██║   ██║\n██║   ██║██╔══██╗██╔══╝  ██╔══██║   ██║   ╚═╝\n╚██████╔╝██║  ██║███████╗██║  ██║   ██║   ██╗\n ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝");
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
            console.log("\n.▄▄▄  ▄• ▄▌▪  ▄▄▄▄▄▄▄▄▄▄▄▄▄ .▄▄▄  \n▐▀•▀█ █▪██▌██ •██  •██  ▀▄.▀·▀▄ █·\n█▌·.█▌█▌▐█▌▐█· ▐█.▪ ▐█.▪▐▀▀▪▄▐▀▀▄ \n▐█▪▄█·▐█▄█▌▐█▌ ▐█▌· ▐█▌·▐█▄▄▌▐█•█▌\n·▀▀█.  ▀▀▀ ▀▀▀ ▀▀▀  ▀▀▀  ▀▀▀ .▀  ▀");
            console.log("Either you slam with the best or you jam with the rest.  Looks like you're content jamming with the rest.");
        };
    });
};

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
                console.log("\n  ::::::::::: :::::::::  :::   :::              :::      ::::::::      :::     ::::::::::: ::::    ::: \n     :+:     :+:    :+: :+:   :+:            :+: :+:   :+:    :+:   :+: :+:       :+:     :+:+:   :+:  \n    +:+     +:+    +:+  +:+ +:+            +:+   +:+  +:+         +:+   +:+      +:+     :+:+:+  +:+   \n   +#+     +#++:++#:    +#++:            +#++:++#++: :#:        +#++:++#++:     +#+     +#+ +:+ +#+    \n  +#+     +#+    +#+    +#+             +#+     +#+ +#+   +#+# +#+     +#+     +#+     +#+  +#+#+#     \n #+#     #+#    #+#    #+#             #+#     #+# #+#    #+# #+#     #+#     #+#     #+#   #+#+#      \n###     ###    ###    ###             ###     ###  ########  ###     ### ########### ###    ####");
                console.log("\nYou've already guessed the letter " + response.guessingGame + " this round!  Try again!");
                index.updateDisplay();
            }
            else if (index.checkGuess()) {
                var backhandedCompliments = ["\n ▄▄ •   V E R Y   ·▄▄▄▄  \n▐█ ▀ ▪▪     ▪     ██▪ ██ \n▄█ ▀█▄ ▄█▀▄  ▄█▀▄ ▐█· ▐█▌\n▐█▄▪▐█▐█▌.▐▌▐█▌.▐▌██. ██ \n·▀▀▀▀  ▀█▄▀▪ ▀█▄▀▪▀▀▀▀▀• ",
                "\n ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄ \n▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌\n▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░▌\n▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌\n▐░▌   ▄   ▐░▌▐░▌       ▐░▌▐░▌   ▄   ▐░▌▐░▌\n▐░▌  ▐░▌  ▐░▌▐░▌       ▐░▌▐░▌  ▐░▌  ▐░▌▐░▌\n▐░▌ ▐░▌░▌ ▐░▌▐░▌       ▐░▌▐░▌ ▐░▌░▌ ▐░▌▐░▌\n▐░▌▐░▌ ▐░▌▐░▌▐░▌       ▐░▌▐░▌▐░▌ ▐░▌▐░▌ ▀ \n▐░▌░▌   ▐░▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌░▌   ▐░▐░▌ ▄ \n▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░▌\n ▀▀       ▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀       ▀▀  ▀ ",
                "\n   ▄████████    ▄████████ ████████▄   ▄█   ▄████████    ▄████████  ▄█\n  ███    ███   ███    ███ ███   ▀███ ███  ███    ███   ███    ███ ███\n  ███    ███   ███    ███ ███    ███ ███▌ ███    █▀    ███    ███ ███\n ▄███▄▄▄▄██▀   ███    ███ ███    ███ ███▌ ███          ███    ███ ███\n▀▀███▀▀▀▀▀   ▀███████████ ███    ███ ███▌ ███        ▀███████████ ███\n▀███████████   ███    ███ ███    ███ ███  ███    █▄    ███    ███ ███\n  ███    ███   ███    ███ ███   ▄███ ███  ███    ███   ███    ███ ███▌    ▄\n  ███    ███   ███    █▀  ████████▀  █▀   ████████▀    ███    █▀  █████▄▄██\n  ███    ███                                                      ▀",
                "\n▄████  ██      ▄     ▄▄▄▄▀ ██      ▄▄▄▄▄      ▄▄▄▄▀ ▄█ ▄█▄\n█▀   ▀ █ █      █ ▀▀▀ █    █ █    █     ▀▄ ▀▀▀ █    ██ █▀ ▀▄\n█▀▀    █▄▄█ ██   █    █    █▄▄█ ▄  ▀▀▀▀▄       █    ██ █   ▀\n█      █  █ █ █  █   █     █  █  ▀▄▄▄▄▀       █     ▐█ █▄  ▄▀\n █        █ █  █ █  ▀         █              ▀       ▐ ▀███▀\n  ▀      █  █   ██           █\n        ▀                   ▀",
                "\n::::    :::     :::     ::::::::::: :::        :::::::::: :::::::::       ::::::::::: :::::::::::\n:+:+:   :+:   :+: :+:       :+:     :+:        :+:        :+:    :+:          :+:         :+: \n:+:+:+  +:+  +:+   +:+      +:+     +:+        +:+        +:+    +:+          +:+         +:+\n+#+ +:+ +#+ +#++:++#++:     +#+     +#+        +#++:++#   +#+    +:+          +#+         +#+\n+#+  +#+#+# +#+     +#+     +#+     +#+        +#+        +#+    +#+          +#+         +#+\n#+#   #+#+# #+#     #+#     #+#     #+#        #+#        #+#    #+#          #+#         #+#\n###    #### ###     ### ########### ########## ########## #########       ###########     ###",
                "\n                     _|                  _|  _|                                  _|        _|\n _|    _|  _|_|_|    _|_|_|      _|_|    _|        _|_|    _|      _|    _|_|_|  _|_|_|    _|    _|_|\n _|    _|  _|    _|  _|    _|  _|_|_|_|  _|  _|  _|_|_|_|  _|      _|  _|    _|  _|    _|  _|  _|_|_|_|\n _|    _|  _|    _|  _|    _|  _|        _|  _|  _|          _|  _|    _|    _|  _|    _|  _|  _|\n   _|_|_|  _|    _|  _|_|_|      _|_|_|  _|  _|    _|_|_|      _|        _|_|_|  _|_|_|    _|    _|_|_|",
                "\n ▄▀▀▄ ▀▄  ▄▀▀█▀▄    ▄▀▄▄▄▄   ▄▀▀█▄▄▄▄ \n█  █ █ █ █   █  █  █ █    ▌ ▐  ▄▀   ▐ \n▐  █  ▀█ ▐   █  ▐  ▐ █        █▄▄▄▄▄  \n  █   █      █       █        █    ▌  \n▄▀   █    ▄▀▀▀▀▀▄   ▄▀▄▄▄▄▀  ▄▀▄▄▄▄   \n█    ▐   █       █ █     ▐   █    ▐   \n▐        ▐       ▐ ▐         ▐    \n",
                "\n___  ____ ____ ____ ___ _  _ ___ ____ _  _ _ _  _ ____\n|__] |__/ |___ |__|  |  |__|  |  |__| |_/  | |\\ | | __\n|__] |  \\ |___ |  |  |  |  |  |  |  | | \\_ | | \\| |__]",
                "\n   ____       __    __       ____      ______     _____      __      _      _____\n  (    )      \\ \\  / /      (    )    (____  )   (_   _)    /  \\    / )    / ___ \\\n  / /\\ \\      () \\/ ()      / /\\ \\        / /      | |     / /\\ \\  / /    / /   \\_)\n ( (__) )     / _  _ \\     ( (__) )   ___/ /_      | |     ) ) ) ) ) )   ( (  ____\n  )    (     / / \\/ \\ \\     )    (   /__  ___)     | |    ( ( ( ( ( (    ( ( (__  )\n /  /\\  \\   /_/      \\_\\   /  /\\  \\    / /____    _| |__  / /  \\ \\/ /     \\ \\__/ /\n/__(  )__\\ (/          \\) /__(  )__\\  (_______)  /_____( (_/    \\__/       \\____/",
                "\n                       .:: .::          .::\n                       .:: .::          .::\n.::     .:::   .::     .:: .::          .::   .::    .:: .::     .::\n .::  :  .:: .:   .::  .:: .::      .:: .:: .::  .::  .::  .:: .:   .::\n .:: .:  .::.::::: .:: .:: .::     .:   .::.::    .:: .::  .::.::::: .::\n .: .: .:.::.:         .:: .::     .:   .:: .::  .::  .::  .::.:\n.:::    .:::  .::::   .:::.:::      .:: .::   .::    .:::  .::  .::::"];
                var givePlayerBackhandedCompliment = function() {
                    return backhandedCompliments[Math.floor(Math.random()*backhandedCompliments.length)]
                };
                console.log(givePlayerBackhandedCompliment());
                console.log("\nGreat guess!");
                index.guessedThisRound.push(response.guessingGame.toLowerCase());
                if (index.numOfBlanks > 0) {
                    index.updateDisplay();
                }
                else {
                    console.log("");
                    index.currentWord.displayWord();
                    console.log("\n ▄▀▀▄ ▄▀▀▄  ▄▀▀█▀▄    ▄▀▄▄▄▄   ▄▀▀▀█▀▀▄  ▄▀▀▀▀▄   ▄▀▀▄▀▀▀▄  ▄▀▀▄ ▀▀▄\n█   █    █ █   █  █  █ █    ▌ █    █  ▐ █      █ █   █   █ █   ▀▄ ▄▀\n▐  █    █  ▐   █  ▐  ▐ █      ▐   █     █      █ ▐  █▀▀█▀  ▐     █\n   █   ▄▀      █       █         █      ▀▄    ▄▀  ▄▀    █        █\n    ▀▄▀     ▄▀▀▀▀▀▄   ▄▀▄▄▄▄▀  ▄▀         ▀▀▀▀   █     █       ▄▀\n           █       █ █     ▐  █                  ▐     ▐       █\n           ▐       ▐ ▐        ▐                                ▐");
                    console.log("\nCongratulations!  You won!");
                    index.wins++;
                    console.log("Wins: " + index.wins +", losses: " + index.losses);
                    startGame();
                };
            }
            else if (!index.checkGuess()) {
                index.guesses--;
                console.log("\n    ,·'´¨;.  '                         ,.-·.                  ,. -,                 ,. -,    \n    ;   ';:\           .·´¨';\        /    ;'\'          ,.·'´,    ,'\          ,.·'´,    ,'\   \n   ;     ';:'\      .'´     ;:'\      ;    ;:::\     ,·'´ .·´'´-·'´::::\'    ,·'´ .·´'´-·'´::::\' \n   ;   ,  '·:;  .·´,.´';  ,'::;'     ';    ;::::;'   ;    ';:::\::\::;:'    ;    ';:::\::\::;:'  \n  ;   ;'`.    ¨,.·´::;'  ;:::;       ;   ;::::;    \·.    `·;:'-·'´       \·.    `·;:'-·'´     \n  ;  ';::; \*´\:::::;  ,':::;‘      ';  ;'::::;      \:`·.   '`·,  '        \:`·.   '`·,  '     \n ';  ,'::;   \::\;:·';  ;:::; '      ;  ';:::';         `·:'`·,   \'           `·:'`·,   \'      \n ;  ';::;     '*´  ;',·':::;‘        ';  ;::::;'         ,.'-:;'  ,·\           ,.'-:;'  ,·\     \n \´¨\::;          \¨\::::;          \*´\:::;‘    ,·'´     ,.·´:::'\     ,·'´     ,.·´:::'\    \n  '\::\;            \:\;·'            '\::\:;'      \`*'´\::::::::;·'‘     \`*'´\::::::::;·'‘   \n    '´¨               ¨'                `*´‘        \::::\:;:·´           \::::\:;:·´        \n      Try again!                                     '`*'´‘                 '`*'´‘            ");
                if (index.guesses === 0) {
                    index.losses++;
                    console.log("\n   ▄   ████▄ █ ▄▄  ▄███▄   \n    █  █   █ █   █ █▀   ▀  \n██   █ █   █ █▀▀▀  ██▄▄    \n█ █  █ ▀████ █     █▄   ▄▀ \n█  █ █        █    ▀███▀   \n█   ██         ▀\n");
                    console.log("Sorry, you have lost this one.  The phrase you were trying to guess was...\n");
                    index.currentWord.displayWordAnyway();
                    console.log("\nWins: " + index.wins +", losses: " + index.losses);
                    startGame();
                }
                else {
                    index.guessedThisRound.push(response.guessingGame.toLowerCase());
                    index.updateDisplay();
                };
            };
        }
        else {
            console.log("\n  ██████  ▄▄▄      ▓█████▄ \n▒██    ▒ ▒████▄    ▒██▀ ██▌\n░ ▓██▄   ▒██  ▀█▄  ░██   █▌\n  ▒   ██▒░██▄▄▄▄██ ░▓█▄   ▌\n▒██████▒▒ ▓█   ▓██▒░▒████▓ \n▒ ▒▓▒ ▒ ░ ▒▒   ▓▒█░ ▒▒▓  ▒ \n░ ░▒  ░ ░  ▒   ▒▒ ░ ░ ▒  ▒ \n░  ░  ░    ░   ▒    ░ ░  ░ \n      ░        ░  ░   ░    \n                    ░   ");
            console.log("\nInvalid input.  Try again!");
            index.updateDisplay();
        };
    });
};

startGame();
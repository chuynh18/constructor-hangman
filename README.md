Constructor Hangman
===================

Introduction
------------
This is a version of hangman built with object constructor functions and Inquirer (an npm package).

How to play
-----------
Make sure your current working directory contains index.js.  Make sure you have dependencies installed, so run `npm i` if you haven't already done so.  After that, simply type `node index.js` into your terminal and press enter to play.

You have 9 guesses per round to successfully guess the presented phrase.  All phrases are derived from or relate to _Star War The Third Gathers:  The Backstroke of the West_.

A few thoughts upon completing this
-----------------------------------
Construtors and objects confused me a little bit at the start, but after I finished `letter.js` and `word.js`, everything made a whole lot more sense.  At least until I made the decision to package a ton of things into an object in `index.js`.  In retrospect, that might have not been the best decision...  it made keeping track of my variable and method names a little bit tricky.

The ugliest part of it all?  using `checkGuess` in `letter.js`, `word.js`, AND `index.js`.  Baaaaad idea.
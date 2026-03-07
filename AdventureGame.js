const readline = require("readline-sync");

playerName = readline.question("What is your name, adventurer?");
console.log(`Welcome, ${playerName}, to the Adventure Game!`);

//Initialize starting stats
let startingGold = 100;
console.log(`Starting gold amount: ${startingGold}`);
/*
Adventure Game
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions.
*/

// Display the game title
console.log("Welcome to the Adventure Game");

// Add a welcome message
console.log("Prepare yourself for an epic journey!");
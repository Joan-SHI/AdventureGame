//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// The Dragon's Quest - Text Adventure Game 
// A progression-based learning project for JavaScript
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Include readline-sync for user input
const readline = require("readline-sync");

//Initialize starting stats
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let inventory = [];

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0; // Will increase to 10 when player buys a sword
console.log("Starting weapon damage: " + weaponDamage);
console.log("When you buy a sword, your weapon damage will increase to 10!");

// Monster defense (affects combat outcomes)
let monsterDefense = 5; // Monster's defense value
console.log("Monster's defense: " + monsterDefense);
console.log("Monsters can withstand some damage in combat!");

// Healing potion restoration (matches final implementation)
let healingPotionRestoration = 30; // Amount of health restored by a healing potion
console.log("Healing potion restores " + healingPotionRestoration + " health.");

//
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("The Dragon's Quest");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("\nYour quest: defeat the dragon in the mountains!");

// Get player's name and welcome them to the game
playerName = readline.question("What is your name, adventurer?");
console.log(`Welcome, ${playerName}, to the Adventure Game!`);
console.log("You start with " + playerGold + " gold.");

// Game state variables
let currentLocation = "village";
let gameRunning = true;
let firstVisit = true; // Track if it's the player's first visit to the village
let hasWeapon = false; // Track if the player has bought a weapon
let hasPotion = false; // Track if the player has bought a healing potion
let hasArmor = false; // Track if the player has bought armor

// Main game loop
while (gameRunning) {
    // Location display 
    if (currentLocation === "village") {
        console.log("\n=== Village ===");
        console.log("You are in a bustling village. The blacksmith and market are nearby.");

        console.log("\nWhat would you like to do?");
        console.log("1. Visit the blacksmith");
        console.log("2. Explore the market");
        console.log("3. Enter the forest");
        console.log("4. Check your stats");
        console.log("5. Check your inventory");
        console.log("6. Quit game");

        if (firstVisit) {
            console.log("\nVillager: 'Welcome, adventurer! Rumor has it there is a dragon in the mountains...'");
            firstVisit = false; // Set to false after the first visit
        }
    }
    else if (currentLocation === "blacksmith") {
        console.log("\n=== Blacksmith ===");
        console.log("The heat from the forge fills the air. Weapons and armor line the walls.");

        console.log("\nWhat would you like to do?");
        console.log("1. Return to the village");
        console.log("2. Check status");
        console.log("3. Check inventory");
        console.log("4. Quit game");
    }
    else if (currentLocation === "market") {
        console.log("\n=== Market ===");
        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");

        console.log("\nWhat would you like to do?");
        console.log("1. Return to the village");
        console.log("2. Check status");
        console.log("3. Check inventory");
        console.log("4. Quit game");
    }
    else if (currentLocation === "forest") {
        console.log("\n=== Forest ===");
        console.log("The forest is dense and eerie. You can hear the sounds of creatures lurking.");

        //Simple battle when entering forest
        let inBattle = true;
        let monsterHealth = 3; // Monster's health for the battle
        console.log("\nBattle starts! A wild monster appears! ");

        while (inBattle) {
            console.log("Monster's health: " + monsterHealth);
            console.log("You attack!");
            monsterHealth--; // Player's attack reduces monster health by 1

            if (monsterHealth <= 0) {
                console.log("You defeated the monster!");
                inBattle = false; // End battle when monster is defeated
            }
        }
        currentLocation = "village"; // Return to village after battle
        console.log("\nYou return to the village after the battle.");
    }

    // Get and validate player choice
    let validChoice = false;
    while (!validChoice) {
        try {
            let choice = readline.question("Enter the number of your choice: ");

            // Check for empty input
            if (choice.trim() === "") {
                throw "Please enter a number!";
            }

            // Convert input to a number and validate
            let choiceNumber = parseInt(choice);
            if (isNaN(choiceNumber)) {
                throw "Invalid input! Please enter a number.";
            }

            // Handle choices based on location
            if (currentLocation === "village") {
                if (choiceNumber < 1 || choiceNumber > 6) {
                    throw "Invalid choice! Please enter a number between 1 and 6.";
                }

                validChoice = true;
                if (choiceNumber === 1) {
                    currentLocation = "blacksmith";
                    console.log("\nYou head to the blacksmith.");
                }
                else if (choiceNumber === 2) {
                    currentLocation = "market";
                    console.log("\nYou explore the market.");
                }
                else if (choiceNumber === 3) {
                    currentLocation = "forest";
                    console.log("\nYou venture into the forest.");
                }
                else if (choiceNumber === 4) {
                    // Show status
                    console.log("\n===" + playerName + "'s Stats===");
                    console.log("Health: " + playerHealth);
                    console.log("Gold: " + playerGold);
                    console.log("Location: " + currentLocation);
                }
                else if (choiceNumber === 5) {
                    // Show inventory
                    console.log("\n===" + playerName + "'s Inventory===");
                    if (inventory.length === 0) {
                        console.log("Your inventory is empty.");
                    } else {
                        inventory.forEach((item, index) => {
                            console.log(`${index + 1}. ${item}`);
                        });
                    }
                }
                else if (choiceNumber === 6) {
                    gameRunning = false; // Exit the game loop
                    console.log("\nThank you for playing! Goodbye!");
                }
            }
            else if (currentLocation === "blacksmith" || currentLocation === "market") {
                if (choiceNumber < 1 || choiceNumber > 4) {
                    throw "Invalid choice! Please enter a number between 1 and 4.";
                }

                validChoice = true;
                if (choiceNumber === 1) {
                    currentLocation = "village";
                    console.log("\nYou return to the " + currentLocation + ".");
                }
                else if (choiceNumber === 2) {
                    // Show status
                    console.log("\n===" + playerName + "'s Stats===");
                    console.log("Health: " + playerHealth);
                    console.log("Gold: " + playerGold);
                    console.log("Location: " + currentLocation);
                }
                else if (choiceNumber === 3) {
                    // Show inventory
                    console.log("\n===" + playerName + "'s Inventory===");
                    if (inventory.length === 0) {
                        console.log("Your inventory is empty.");
                    } else {
                        inventory.forEach((item, index) => {
                            console.log(`${index + 1}. ${item}`);
                        });
                    }
                }
                else if (choiceNumber === 4) {
                    gameRunning = false; // Exit the game loop
                    console.log("\nThank you for playing! Goodbye!");
                }
            }

        } catch (error) {
            console.log("\nError: " + error); // Display error message for invalid input
            console.log("Please try again."); // Prompt user to try again after an error
        }
    }
    if (playerHealth <= 0) {
        console.log("\nYou have been defeated! Game over.");
        gameRunning = false; // End the game if player health drops to 0 or below
    }
}










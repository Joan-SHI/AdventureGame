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

// Show status function (can be called from any location)
function showStatus() {
    console.log("\n===" + playerName + "'s Stats===");
    console.log("Health: " + playerHealth);
    console.log("Gold: " + playerGold);
    console.log("Location: " + currentLocation);
}

// Show location function (can be called from any location)
function showLocation() {
    console.log("\n=== " + currentLocation.toUpperCase() + " ===");
    if (currentLocation === "village") {

        console.log("You are in a bustling village. The blacksmith and market are nearby.");

        console.log("\nWhat would you like to do?");
        console.log("1. Visit the blacksmith");
        console.log("2. Explore the market");
        console.log("3. Enter the forest");
        console.log("4. Check your stats");
        console.log("5. Check your inventory");
        console.log("6. Quit game");
    }
    else if (currentLocation === "blacksmith") {

        console.log("The heat from the forge fills the air. Weapons and armor line the walls.");

        console.log("\nWhat would you like to do?");
        console.log("1. Return to the village");
        console.log("2. Check status");
        console.log("3. Check inventory");
        console.log("4. Quit game");
    }
    else if (currentLocation === "market") {

        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");

        console.log("\nWhat would you like to do?");
        console.log("1. Return to the village");
        console.log("2. Check status");
        console.log("3. Check inventory");
        console.log("4. Quit game");
    }
}

function move(choiceNumber) {
    let validMove = false;

    if (currentLocation === "village") {
        if (choiceNumber === 1) {
            currentLocation = "blacksmith";
            console.log("\nYou head to the blacksmith.");
            validMove = true;
        }
        else if (choiceNumber === 2) {
            currentLocation = "market";
            console.log("\nYou head to the market.");
            validMove = true;
        }
        else if (choiceNumber === 3) {
            currentLocation = "forest";
            console.log("\nYou venture into the forest.");
            validMove = true;
        }
    }
    else if (currentLocation === "blacksmith" || currentLocation === "market") {
        if (choiceNumber === 1) {
            currentLocation = "village";
            console.log("\nYou return to the village.");
            validMove = true;
        }
    }
    return validMove; // Return whether the move was valid or not
}

// Handle combat 
function handleCombat() {
    if (hasWeapon) {
        console.log("You have a baguette! You attack!");
        console.log("You won and found 10 gold!");
        playerGold = + 10; // Increase player's gold by 10 after winning combat
        return true; // Return true to indicate player won the combat
    } else {
        console.log("You have no weapon! You must run away!");
        updateHealth(-20); // Player takes damage for running away without a weapon
        return false; // Return false to indicate player lost the combat    
    }
}

// Updates player health within valid range 
function updateHealth(amount) {
    playerHealth += amount; // Update health by the specified amount
    if (playerHealth > 100) {
        playerHealth = 100; // Cap health at 100
        console.log("Your health is full at 100!"); // Notify player when health is fully restored

    } else if (playerHealth < 0) {
        playerHealth = 0; // Ensure health doesn't drop below 0
        console.log("Your health has dropped to 0! You are defeated!"); // Notify player of defeat when health reaches 0    
    }
    console.log("Your health is now: " + playerHealth); // Display updated health
    return playerHealth; // Return the updated health value
}

// Check inventory function (can be called from any location)
function checkInventory() {
    console.log("\n===" + playerName + "'s Inventory===");
    if (!hasWeapon && !hasPotion && !hasArmor) {
        console.log("Your inventory is empty.");
    } else {
        if (hasWeapon) {
            console.log("- Sword");
        }

        if (hasPotion) {
            console.log("- Health Potion");
        }
        if (hasArmor) {
            console.log("- Shield");
        }
    }
}
// Main game loop
while (gameRunning) {
    //show current location and options
    showLocation();

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

                // ???????
                if (choiceNumber <= 3) {
                    if (!move(choiceNumber)) {
                        console.log("\nYou can't go there!");
                    }
                    else if (choiceNumber === 3) {
                        console.log("\nA monster appears!");
                        if (!handleCombat()) {
                            currentLocation = "village";
                        }
                    }
                }

                else if (choiceNumber === 4) {
                    // Show status
                    showStatus();
                }
                else if (choiceNumber === 5) {
                    // Show inventory
                    checkInventory();
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
                    move(choiceNumber); // Move back to the village
                }
                else if (choiceNumber === 2) {
                    // Show status
                    showStatus();
                }
                else if (choiceNumber === 3) {
                    // Show inventory
                    checkInventory();
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

    // Check if player health has dropped to 0 or below after combat or other events
    if (playerHealth <= 0) {
        console.log("\nYou have been defeated! Game over.");
        gameRunning = false; // End the game if player health drops to 0 or below
    }
}










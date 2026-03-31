//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// The Dragon's Quest - Text Adventure Game 
// A progression-based learning project for JavaScript
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Include readline-sync for user input
const readline = require("readline-sync");

// Game state variables
let currentLocation = "village";
let gameRunning = true;
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let hasWeapon = false; // Track if the player has bought a weapon
let hasPotion = false; // Track if the player has bought a healing potion
let hasArmor = false; // Track if the player has bought armor

// let firstVisit = true; // Track if it's the player's first visit to the village
// let inventory = [];

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0; // Will increase to 10 when player buys a sword
let monsterDefense = 5; // Monster's defense value
let healingPotionRestoration = 30; // Amount of health restored by a healing potion

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Display Functions
// Functions that show game information to the player. 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Show the player's current status (health, gold, location)
function showStatus() {
    console.log("\n===" + playerName + "'s Stats===");
    console.log("Health: " + playerHealth);
    console.log("Gold: " + playerGold);
    console.log("Location: " + currentLocation);
}

// Show the current location's description and available choices. 
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
        console.log("6. Help");
        console.log("7. Quit game");
    }
    else if (currentLocation === "blacksmith") {

        console.log("The heat from the forge fills the air. Weapons and armor line the walls.");

        console.log("\nWhat would you like to do?");
        console.log("1. Buy a sword(10 gold)");
        console.log("2. Return to the village");
        console.log("3. Check status");
        console.log("4. Check inventory");
        console.log("5. Help");
        console.log("6. Quit game");
    }
    else if (currentLocation === "market") {

        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");

        console.log("\nWhat would you like to do?");
        console.log("1. Buy a healing potion(5 gold)");
        console.log("2. Return to the village");
        console.log("3. Check status");
        console.log("4. Check inventory");
        console.log("5. Help");
        console.log("6. Quit game");
    }
    else if (currentLocation === "forest") {

        console.log("The forest is dark and full of danger. You hear strange noises in the distance.");

        console.log("\nWhat would you like to do?");
        console.log("1. Return to the village");
        console.log("2. Check status");
        console.log("3. Check inventory");
        console.log("4. Help");
        console.log("5. Quit game");
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Movement Functions that handle player navigation between locations.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

            // Trigger combat when entering forest
            console.log("\nA monster appears!");
            if (!handleCombat()) {
                currentLocation = "village"; // Return to village if player loses combat
            }
        }
    }
    else if (currentLocation === "blacksmith" || currentLocation === "market") {
        if (choiceNumber === 2) {
            currentLocation = "village";
            console.log("\nYou return to the village.");
            validMove = true;
        }
    }
    else if (currentLocation === "forest") {
        if (choiceNumber === 1) {
            currentLocation = "village";
            console.log("\nYou return to the village.");
            validMove = true;
        }
    }

    return validMove; // Return whether the move was valid or not
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Combat Functions that handle encounters with monsters and combat mechanics.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    

/**  Handle combat encounters when the player enters the forest
 *  Check if the player has a weapon to determine combat outcome
 *  @returns {boolean} - true if player wins combat, false if player loses combat
*/
function handleCombat() {
    if (hasWeapon) {
        console.log("You have a baguette! You attack!");
        console.log("You won and found 10 gold!");
        playerGold += 10; // Increase player's gold by 10 after winning combat
        return true; // Return true to indicate player won the combat
    } else {
        console.log("You have no weapon! You must run away!");
        updateHealth(-20); // Player takes damage for running away without a weapon
        return false; // Return false to indicate player lost the combat    
    }
}

/**
 * Updates player health within valid range (0 to 100) and handles defeat condition.
 * @param {number} amount - The amount to change the player's health by (positive for healing, negative for damage)
 * @returns {number} The updated health value   
 */

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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Item functions(item usage and inventory)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Handles using items like potions  
 * @returns {boolean} true if item was used successfully, false if not
 */
function useItem() {
    if (hasPotion) {
        console.log("You use a health potion!");
        updateHealth(healingPotionRestoration); // Restore health by the potion's restoration amount
        hasPotion = false; // Remove potion from inventory after use
        return true; // Return true to indicate potion was used successfully
    }
    console.log("You have no potions to use!"); // Notify player if they try to use a potion they don't have    
    return false; // Return false if no potion is available
}

// Displays the player's inventory. 
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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Shopping Functions that handle buying items from the blacksmith and market.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Handles buying items from the blacksmith.  
function buyFmBlacksmith() {

    if (playerGold >= 10) {
        playerGold -= 10; // Deduct gold for the sword
        hasWeapon = true; // Player now has a weapon
        weaponDamage = 10; // Set weapon damage to 10 when player buys a sword
        console.log("You bought a sword! Your attacks will now do more damage.");
        return true; // Return true to indicate purchase was successful
    } else {
        console.log("You don't have enough gold to buy a sword!"); // Notify player if they can't afford the sword
        return false; // Return false to indicate purchase failed
    }
}

// Handles buying items from the market.
function buyFmMarket() {

    if (playerGold >= 5) {
        playerGold -= 5; // Deduct gold for the potion
        hasPotion = true; // Player now has a potion
        console.log("You bought a health potion!");
        return true; // Return true to indicate purchase was successful
    } else {
        console.log("You don't have enough gold to buy a health potion!"); // Notify player if they can't afford the potion
        return false; // Return false to indicate purchase failed
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Help System that provides guidance to the player when they ask for help.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Show all available commands and options to the player.
function showHelp() {
    console.log("\n=== HELP MENU ===");
    console.log("\nMovement Commands:");
    console.log("- In the village, choose 1-3 to move to different locations");
    console.log("- In other locations, choose 1 to return to the village");

    console.log("\nBattle Information:");
    console.log("- If you have a weapon, you will win combat encounters and earn gold.");
    console.log("- Monster encounters happen when you enter the forest.");
    console.log("- Without a weapon, you will lose health and must retreat to the village.");

    console.log("\nItem Usage:");
    console.log("- You can buy a sword from the blacksmith for 10 gold to increase your combat effectiveness.");
    console.log("- You can buy a health potion from the market for 5 gold to restore 30 health.");
    console.log("- Use items from your inventory to gain advantages in combat.");

    console.log("\nOther Commands:");
    console.log("Choose the check status option to view your current health, gold, and location.");
    console.log("Choose the help option to view this help menu again.");
    console.log("Choose the quit option to exit the game.");

    console.log("\n Tips:");
    console.log("- Explore the village and visit the blacksmith and market to prepare for combat.");
    console.log("- Always check your inventory and status before venturing into the forest.");
    console.log("- Use your gold wisely to buy items that will help you survive and succeed in your adventure!");
    console.log("- Defeat monsters in the forest to earn more gold and improve your chances of survival!");
    console.log("- Health can't go above 100, so use potions strategically to keep your health up for tougher encounters!");
    console.log("- Remember, you need a weapon to win combat encounters, so consider buying a sword from the blacksmith early on to increase your chances of success in the forest!");
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Input Validation 
// Make sure player's input is valid. 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Validate player input to ensure it's a number within the valid range of options for the current location.
 * @param {*} input The user's input to validate
 * @param {*} max THe maximum valid option number for the current location (e.g. 7 for village, 6 for blacksmith/market, 5 for forest)
 * @returns {boolean} true if input is valid, false otherwise   
 */
function validateInput(input, max) {
    if (input === "") return false; // Check for empty input
    if (isNaN(input)) return false; // Check for non-numeric input
    let choiceNumber = parseInt(input);
    if (choiceNumber < 1 || choiceNumber > max) return false; // Check if input is within valid options
    return true; // Input is valid
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Main Game Loop
// Controls the flow of the game. 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("Welcome to The Monster's Quest - A Text Adventure Game!");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("\nYour quest: Defeat the monster in the forest and survive the adventure!");

// Get player's name
playerName = readline.question("What is your name, adventurer?");
console.log(`Welcome, ${playerName}, to the Adventure Game!`);
console.log("You start with " + playerGold + " gold.");

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
                if (choiceNumber < 1 || choiceNumber > 7) {
                    throw "Invalid choice! Please enter a number between 1 and 7.";
                }

                validChoice = true;

                if (choiceNumber <= 3) {
                    move(choiceNumber); // Attempt to move to the chosen location
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
                    // Show help menu
                    showHelp();
                }
                else if (choiceNumber === 7) {
                    gameRunning = false; // Exit the game loop
                    console.log("\nThank you for playing! Goodbye!");
                }
            }
            else if (currentLocation === "blacksmith" || currentLocation === "market") {
                if (choiceNumber < 1 || choiceNumber > 6) {
                    throw "Invalid choice! Please enter a number between 1 and 6.";
                }

                validChoice = true;
                if (choiceNumber === 1) {
                    if (currentLocation === "blacksmith") {
                        buyFmBlacksmith();
                    } else if (currentLocation === "market") {
                        buyFmMarket();
                    }
                }
                if (choiceNumber === 2) {
                    move(choiceNumber); // Move back to the village
                }
                else if (choiceNumber === 3) {
                    // Show status
                    showStatus();
                }
                else if (choiceNumber === 4) {
                    // Show inventory
                    checkInventory();
                }
                else if (choiceNumber === 5) {
                    // Show help menu
                    showHelp();
                }
                else if (choiceNumber === 6) {
                    gameRunning = false; // Exit the game loop
                    console.log("\nThank you for playing! Goodbye!");
                }
            }
            else if (currentLocation === "forest") {
                if (choiceNumber < 1 || choiceNumber > 5) {
                    throw "Invalid choice! Please enter a number between 1 and 5.";
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
                    // Show help menu
                    showHelp();
                }
                else if (choiceNumber === 5) {
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










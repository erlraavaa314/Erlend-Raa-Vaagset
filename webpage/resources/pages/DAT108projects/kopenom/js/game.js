import Creature from './creature.js';
import Battle from './battle.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded, setting up event listeners.");

    let battle;  // Reference to the active battle

    // Function to create a new creature and start a game
    function startNewGame() {
        const name = document.getElementById('creature-name').value;
        const element = document.getElementById('creature-element').value;

        console.log(`Starting new game. Player: ${name}, Element: ${element}`);

        // Create player and enemy creatures
        const playerCreature = new Creature(name, element);
        const enemyCreature = createRandomEnemy();

        console.log("Created player and enemy creatures.");
        console.log("Player Creature:", playerCreature);
        console.log("Enemy Creature:", enemyCreature);

        // Hide form and show creature display
        document.getElementById('creature-form').style.display = 'none';
        document.getElementById('creature-display').style.display = 'block';  // Show the creature display

        // Populate the creature info display
        document.getElementById('creature-name-display').textContent = playerCreature.name;
        document.getElementById('creature-element-display').textContent = playerCreature.element;
        document.getElementById('creature-hp-display').textContent = `${playerCreature.hp}/${playerCreature.maxHp}`;
        document.getElementById('creature-attack-display').textContent = playerCreature.attack;
        document.getElementById('creature-defense-display').textContent = playerCreature.defense;

        // Initialize the battle (reusing or creating a new one)
        if (!battle) {
            battle = new Battle(playerCreature, enemyCreature);  // Initialize the battle
        } else {
            battle.playerCreature = playerCreature;
            battle.enemyCreature = enemyCreature;
        }

        // Show the Start Battle button and hide the Attack button
        document.getElementById('start-battle').style.display = 'block';
        document.getElementById('attack-btn').style.display = 'none';
    }

    // Helper function to create a random enemy
    function createRandomEnemy() {
        const elements = ['fire', 'water', 'earth', 'air'];
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        return new Creature('Enemy Creature', randomElement);
    }

    // Event listener for submitting the creature form
    document.getElementById('creature-form').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("Creature form submitted, starting new game.");
        startNewGame();
    });

    // Event listener for starting the battle introduction (stats scene)
    document.getElementById('start-battle').addEventListener('click', () => {
        document.getElementById('creature-display').style.display = 'none';  // Hide creature display
        document.getElementById('start-battle').style.display = 'none';  // Hide Start Battle button

        // Show the battle introduction scene
        document.getElementById('battle-intro').style.display = 'block';  // Show stats for both Pokémon

        // Populate both player and enemy stats in the battle introduction scene
        document.getElementById('player-intro-status').textContent = `${battle.playerCreature.name} - HP: ${battle.playerCreature.hp}/${battle.playerCreature.maxHp}, Attack: ${battle.playerCreature.attack}, Defense: ${battle.playerCreature.defense}`;
        document.getElementById('enemy-intro-status').textContent = `${battle.enemyCreature.name} - HP: ${battle.enemyCreature.hp}/${battle.enemyCreature.maxHp}, Attack: ${battle.enemyCreature.attack}, Defense: ${battle.enemyCreature.defense}`;
        
        console.log("Displayed both Pokémon's stats in the intro scene.");
    });

    // Event listener for proceeding to the battle phase after reviewing stats
    document.getElementById('proceed-to-battle').addEventListener('click', () => {
        document.getElementById('battle-intro').style.display = 'none';  // Hide the intro scene

        // Show the actual battle phase
        document.getElementById('battle-phase').style.display = 'block';  // Show the battle phase

        // Show the Attack button and allow the player to choose an attack
        document.getElementById('attack-btn').style.display = 'block';
        battle.startBattle();  // Proceed to the actual battle
        console.log("Battle started, waiting for player's first move.");
    });

    // Event listener for performing an attack
    document.getElementById('attack-btn').addEventListener('click', () => {
        const selectedMoveIndex = parseInt(document.getElementById('move-choice').value, 10);
        console.log("Player attacking with move index:", selectedMoveIndex);
        battle.handleAttack(selectedMoveIndex);  // Perform the attack
    });

    // Restart game logic
    document.getElementById('restart-game').addEventListener('click', () => {
        document.getElementById('restart-game').style.display = 'none';
        document.getElementById('creature-form').style.display = 'block';  // Show the creature form
        document.getElementById('battle-phase').style.display = 'none';  // Hide battle phase
        console.log("Game restarted.");
    });
});

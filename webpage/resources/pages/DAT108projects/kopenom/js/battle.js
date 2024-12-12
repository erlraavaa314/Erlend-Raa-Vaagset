import Creature from './creature.js';

class Battle {
    constructor(playerCreature, enemyCreature) {
        this.playerCreature = playerCreature;
        this.enemyCreature = enemyCreature;
        this.battleInProgress = false;
    }

// Start the battle (show player and enemy stats, but do NOT trigger attack yet)
startBattle() {
    if (this.battleInProgress) return;
    this.battleInProgress = true;

    // Hide the form and display battle phase
    document.getElementById('creature-form').style.display = 'none';
    document.getElementById('creature-display').style.display = 'none';
    document.getElementById('battle-phase').style.display = 'block';

    // Update player and enemy creature stats
    this.updateCreatureInfo(this.playerCreature, 'player-status');
    this.updateCreatureInfo(this.enemyCreature, 'enemy-status');
    this.populateMoveChoices();  // Show move choices for the player

    // Now the player needs to choose a move (do not trigger attack automatically)
    console.log("Battle started, waiting for player's first attack.");
}

    // Update battle status
    updateBattleStatus() {
        document.getElementById('player-status').textContent = `${this.playerCreature.name}: HP ${this.playerCreature.hp}/${this.playerCreature.maxHp}`;
        document.getElementById('enemy-status').textContent = `${this.enemyCreature.name}: HP ${this.enemyCreature.hp}/${this.enemyCreature.maxHp}`;
    }

    // Update player or enemy info
    updateCreatureInfo(creature, elementId) {
        document.getElementById(elementId).textContent = `
            Name: ${creature.name}, Element: ${creature.element}, 
            HP: ${creature.hp}/${creature.maxHp}, Attack: ${creature.attack}, 
            Defense: ${creature.defense}
        `;
    }

    // Populate player move choices
    populateMoveChoices() {
        const moveSelect = document.getElementById('move-choice');
        moveSelect.innerHTML = '';  // Clear previous options

        this.playerCreature.moves.forEach((move, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${move.name} (Power: ${move.power})`;
            moveSelect.appendChild(option);
        });
    }

    // Handle attacks
    handleAttack(selectedMoveIndex) {
        const selectedMove = this.playerCreature.moves[selectedMoveIndex];
        const playerDamage = this.randomStat(10, selectedMove.power);

        const enemySurvived = this.enemyCreature.takeDamage(playerDamage);
        if (!enemySurvived) {
            this.endBattle(true);  // Player won
            return;
        }

        const enemyMove = this.enemyCreature.moves[this.randomStat(0, this.enemyCreature.moves.length - 1)];
        const enemyDamage = this.randomStat(10, enemyMove.power);
        const playerSurvived = this.playerCreature.takeDamage(enemyDamage);
        if (!playerSurvived) {
            this.endBattle(false);  // Player lost
        }

        this.updateBattleStatus();  // Update battle status after each round
    }

    // End battle logic
    endBattle(playerWon) {
        this.battleInProgress = false;

        if (playerWon) {
            alert('You won the battle!');
            // Generate a new enemy and continue the battle with player’s current creature
            const newEnemy = new Creature('Enemy Creature', this.randomElement());
            this.enemyCreature = newEnemy;
            this.startBattle();  // Restart battle with new enemy
        } else {
            alert('You lost the battle!');
            // Show restart button
            document.getElementById('battle-phase').style.display = 'none';
            document.getElementById('restart-game').style.display = 'block';
        }
    }

    randomStat(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Random element generator for enemies
    randomElement() {
        const elements = ['fire', 'water', 'earth', 'air'];
        return elements[Math.floor(Math.random() * elements.length)];
    }
}

export default Battle;

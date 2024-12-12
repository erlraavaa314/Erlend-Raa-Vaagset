import Creature from './creature.js';  // Importerer Creature-klassen

// Klassen Battle representerer en kamp mellom spillerens skapning og fiendens skapning.
class Battle {
    // Constructor-funksjonen tar inn både spillerens skapning og fiendens skapning
    constructor(playerCreature, enemyCreature) {
        this.playerCreature = playerCreature;  // Spillerens skapning
        this.enemyCreature = enemyCreature;  // Fiendens skapning
        this.battleInProgress = false;  // Brukes til å holde styr på om en kamp pågår
    }

    // Starter kampen (når spilleren har valgt å begynne)
    startBattle() {
        if (this.battleInProgress) return;  // Hvis en kamp allerede er i gang, returner uten å gjøre noe.
        this.battleInProgress = true;

        // Skjuler skjemaet for skapning og viser kampfasen
        document.getElementById('creature-form').style.display = 'none';
        document.getElementById('battle-phase').style.display = 'block';

        // Oppdaterer statistikken til både spillerens og fiendens skapning
        this.updateBattleStatus();
        this.populateMoveChoices();
    }

    // Oppdaterer kampstatusen (viser navn og HP til begge skapningene)
    updateBattleStatus() {
        document.getElementById('player-status').textContent = `${this.playerCreature.name}: HP ${this.playerCreature.hp}/${this.playerCreature.maxHp}`;
        document.getElementById('enemy-status').textContent = `${this.enemyCreature.name}: HP ${this.enemyCreature.hp}/${this.enemyCreature.maxHp}`;
    }

    // Fyller drop-down menyen med spillerens tilgjengelige angrep
    populateMoveChoices() {
        const moveSelect = document.getElementById('move-choice');
        moveSelect.innerHTML = '';  // Fjerner gamle valg i menyen

        // Legger til hvert angrep som et valg i menyen
        this.playerCreature.moves.forEach((move, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${move.name} (Power: ${move.power})`;
            moveSelect.appendChild(option);
        });
    }

    // Funksjon som håndterer når spilleren angriper
    handleAttack(selectedMoveIndex) {
        const selectedMove = this.playerCreature.moves[selectedMoveIndex];  // Henter det valgte angrepet
        const playerDamage = this.randomStat(10, selectedMove.power);  // Beregner skaden basert på angrepets styrke

        // Utfør skade på fienden
        const enemySurvived = this.enemyCreature.takeDamage(playerDamage);
        if (!enemySurvived) {  // Hvis fienden dør (HP = 0)
            this.endBattle(true);  // Avslutter kampen med seier for spilleren
            return;
        }

        // Fienden utfører sitt angrep
        const enemyMove = this.enemyCreature.moves[this.randomStat(0, this.enemyCreature.moves.length - 1)];
        const enemyDamage = this.randomStat(10, enemyMove.power);
        const playerSurvived = this.playerCreature.takeDamage(enemyDamage);  // Spilleren tar skade
        if (!playerSurvived) {  // Hvis spilleren dør
            this.endBattle(false);  // Avslutter kampen med tap
        }

        // Oppdaterer statusen etter begge angrep
        this.updateBattleStatus();
    }

    // Avslutter kampen (med seier eller tap)
    endBattle(playerWon) {
        this.battleInProgress = false;

        alert(playerWon ? 'You won the battle!' : 'You lost the battle!');  // Viser resultatet av kampen
        document.getElementById('battle-phase').style.display = 'none';  // Skjuler kampfasen
        document.getElementById('restart-game').style.display = 'block';  // Viser restart-knappen
    }

    // Hjelpefunksjon som genererer tilfeldige tall for skadekalkulering
    randomStat(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Eksporterer Battle-klassen slik at den kan brukes i andre filer (som game.js)
export default Battle;

// Forslag til forbedringer:
//

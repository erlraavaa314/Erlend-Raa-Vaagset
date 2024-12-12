import Creature from './creature.js';  // Importerer Creature-klassen fra creature.js
import Battle from './battle.js';  // Importerer Battle-klassen fra battle.js

// Venter til siden er ferdig lastet før vi setter opp event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded, setting up event listeners.");

    let battle;  // Referanse til den aktive kampen (Battle-objektet)

    // Funksjon for å opprette en ny skapning og starte spillet
    function startNewGame() {
        const name = document.getElementById('creature-name').value;  // Henter navnet på skapningen fra inputfeltet
        const element = document.getElementById('creature-element').value;  // Henter elementet fra drop-down menyen

        console.log(`Starting new game. Player: ${name}, Element: ${element}`);

        // Oppretter spillerens skapning og fiendens skapning
        const playerCreature = new Creature(name, element);
        const enemyCreature = new Creature('Enemy Creature', 'air');  // Fienden har element "air"

        console.log("Created player and enemy creatures.");
        console.log("Player Creature:", playerCreature);
        console.log("Enemy Creature:", enemyCreature);

        // Skjuler skjemaet for å opprette en skapning og viser skjermbildet med skapningsinfo
        document.getElementById('creature-form').style.display = 'none';
        document.getElementById('creature-display').style.display = 'block';  

        // Fyller ut skjermbildet med informasjon om skapningen
        document.getElementById('creature-name-display').textContent = playerCreature.name;
        document.getElementById('creature-element-display').textContent = playerCreature.element;
        document.getElementById('creature-hp-display').textContent = `${playerCreature.hp}/${playerCreature.maxHp}`;
        document.getElementById('creature-attack-display').textContent = playerCreature.attack;
        document.getElementById('creature-defense-display').textContent = playerCreature.defense;

        // Setter opp Battle-objektet (kampen) hvis det ikke allerede er opprettet
        if (!battle) {
            battle = new Battle(playerCreature, enemyCreature);  // Oppretter en ny kamp mellom spiller og fiende
        } else {
            battle.playerCreature = playerCreature;  // Gjenbruker den eksisterende kampen hvis den finnes
            battle.enemyCreature = enemyCreature;
        }
    }

    // Lytter etter når brukeren sender inn skjemaet for å opprette en skapning
    document.getElementById('creature-form').addEventListener('submit', (event) => {
        event.preventDefault();  // Hindrer standard form oppførsel (som å sende en HTTP-request)
        console.log("Creature form submitted, starting new game.");
        startNewGame();  // Starter et nytt spill
    });

    // Lytter etter når brukeren trykker på "Start Battle"-knappen
    document.getElementById('start-battle').addEventListener('click', () => {
        document.getElementById('creature-display').style.display = 'none';  // Skjuler skapningsinfoen
        battle.startBattle();  // Starter kampen
        console.log("Battle started.");
    });

    // Lytter etter når spilleren velger et angrep under kampen
    document.getElementById('attack-btn').addEventListener('click', () => {
        const selectedMoveIndex = parseInt(document.getElementById('move-choice').value, 10);  // Henter valgt angrep
        console.log("Player attacking with move index:", selectedMoveIndex);
        battle.handleAttack(selectedMoveIndex);  // Utfører angrepet
    });

    // Lytter etter når brukeren trykker på "Restart Game"-knappen
    document.getElementById('restart-game').addEventListener('click', () => {
        document.getElementById('restart-game').style.display = 'none';  // Skjuler restart-knappen
        document.getElementById('creature-form').style.display = 'block';  // Viser skjemaet for å lage ny skapning
        document.getElementById('battle-phase').style.display = 'none';  // Skjuler kampfasen
        console.log("Game restarted.");
    });
});

// Forslag til forbedringer:
// 1. Hva med å gi spilleren et valg mellom flere fiender med ulike elementer?
// 2. Legg til en "item"-funksjon slik at spilleren kan bruke potions til å helbrede skapningen sin under kamp.

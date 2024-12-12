// creature.js

// Klassen "Creature" representerer en skapning, enten spilleren eller fienden, som deltar i kampen.
// Hver skapning har unike egenskaper, som navn, element (f.eks. ild, vann), HP (helsepoeng), angrep og forsvar.
// Denne klassen lar oss definere disse egenskapene for hver skapning og lage deres angrep basert på elementet.

class Creature {
    // Constructor-funksjonen kjøres automatisk hver gang vi lager en ny skapning.
    // Her må vi gi skapningen et navn og et element, som vi bruker til å sette egenskaper.
    constructor(name, element) {
        this.name = name;  // Navnet på skapningen (for eksempel "Charizard" eller "Squirtle").
        this.element = element;  // Elementet til skapningen bestemmer hvilke angrep den har.
        
        // Vi setter HP (helsepoeng) til en tilfeldig verdi mellom 100 og 150.
        // Dette gjør at hver skapning kan ha litt forskjellige egenskaper, selv med samme navn og element.
        this.maxHp = this.randomStat(100, 150);  
        this.hp = this.maxHp;  // Vi starter med full HP (maks HP).
        
        // Angrepsstyrke og forsvar genereres også tilfeldig for å gi litt variasjon.
        // Prøv å endre minimums- eller maksimumsverdiene for å gjøre noen skapninger sterkere eller svakere.
        this.attack = this.randomStat(20, 50);  
        this.defense = this.randomStat(20, 50);

        // Genererer en liste med angrep basert på skapningens element.
        // Hvert element har tre unike angrep med forskjellig styrke og effekt.
        // Spørsmål: Hva om vi introduserte et nytt element, som "Lightning"?
        this.moves = this.generateMoves();  
    }

    // Denne funksjonen genererer en tilfeldig verdi mellom to tall, min og max.
    // Brukes til å lage tilfeldige verdier for HP, angrep og forsvar.
    // Eksperiment: Prøv å sette lavere minimum og høyere maksimum og observer hvordan dette påvirker kampene.
    randomStat(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;  // Tilfeldig tall mellom min og max.
    }

    // Funksjonen takeDamage reduserer HP (helsepoengene) til skapningen når den tar skade.
    // Dette er hva som skjer når skapningen blir angrepet under kampen.
    takeDamage(damage) {
        this.hp -= damage;  // Trekk skaden fra skapningens nåværende HP.
        if (this.hp < 0) this.hp = 0;  // Pass på at HP aldri blir mindre enn 0.
        // Returnerer 'true' hvis skapningen fortsatt har HP igjen, 'false' hvis den er død (HP = 0).
        return this.hp > 0;  
    }

    // Funksjonen heal legger til HP (helse) til skapningen.
    // Dette kan brukes til å helbrede en skapning under kamp (f.eks. hvis vi legger til healing items senere).
    heal(amount) {
        // Gjenoppretter HP, men overskrider aldri maks HP.
        // Spørsmål: Hva skjer hvis vi lar heal overskride maxHp? Hva kan gå galt?
        this.hp = Math.min(this.hp + amount, this.maxHp);  
    }

    // Denne funksjonen genererer en liste med angrep (moves) basert på skapningens element.
    // Hvert angrep har en styrke (power) og en mulig effekt (som 'flinch' eller 'buff').
    generateMoves() {
        // Spørsmål: Kan du legge til et fjerde angrep for hvert element med en ny effekt, f.eks. 'burn'?
        return [
            { name: `${this.element} Blast`, power: this.randomStat(30, 40), effect: 'none' },  // Kraftig angrep uten ekstra effekt.
            { name: `${this.element} Strike`, power: this.randomStat(20, 30), effect: 'flinch' },  // Svakere angrep, men kan gi fienden flinch.
            { name: `${this.element} Surge`, power: this.randomStat(40, 50), effect: 'buff' }  // Meget kraftig angrep som kan forbedre statistikkene.
        ];
    }
}

// Eksporterer Creature-klassen slik at den kan brukes i andre deler av spillet (game.js, battle.js).
export default Creature;

// Forslag til videreutvikling:
// 1. Legg til nye elementtyper (for eksempel 'Electric' eller 'Shadow') og gi dem unike angrep.
// 2. La spillerne utvikle skapningene sine etter at de har vunnet kamper for å gi dem bedre statistikk.
// 3. Kan du lage en funksjon som gir bonusstatistikker basert på hvor mange kamper en skapning har vunnet?

// creature.js
class Creature {
    constructor(name, element) {
        this.name = name;  // Navn på skapningen (spiller eller fiende).
        this.element = element;  // Elementtype (f.eks. ild, vann, luft).
        this.maxHp = this.randomStat(100, 150);  // Setter tilfeldig maksimal HP.
        this.hp = this.maxHp;  // Start HP er lik maksimal HP (this.hp should equal maxHp).
        this.attack = this.randomStat(20, 50);  // Tilfeldig angrepsverdi.
        this.defense = this.randomStat(20, 50);  // Tilfeldig forsvarsverdi.
        this.moves = this.generateMoves();  // Genererer angrepene basert på elementet.
    }

    // Genererer tilfeldige verdier for skapningens statistikker.
    randomStat(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Funksjon for å ta skade. Returnerer true hvis skapningen overlever.
    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;  // Hindrer at HP blir negativ.
        return this.hp > 0;
    }

    // Funksjon for å helbrede HP.
    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.maxHp);  // Helbreder men overskrider ikke maks HP.
    }

    generateMoves() {
        return [
            { name: `${this.element} Blast`, power: this.randomStat(30, 40), effect: 'none' },
            { name: `${this.element} Strike`, power: this.randomStat(20, 30), effect: 'flinch' },
            { name: `${this.element} Surge`, power: this.randomStat(40, 50), effect: 'buff' }
        ];
    }
}

export default Creature;

export default class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.previousPosition;
        this.previousMouvement = [];
        this.previousWeapon;
        this.health = 100;
        this.defense = false;
        this.weapon = {
            weapon: "weapon_0",
            dommage: 10
        };
    }

    toAttack(playerToAttack) {
        let dommage = this.weapon.dommage;
        if(playerToAttack.health > 0) {
            if(playerToAttack.defense === true) {
                dommage = dommage-(dommage * 50/100);
                playerToAttack.defense = false;
            } 
            playerToAttack.health  = playerToAttack.health - dommage;
        }
    }

    toBlockTheAttack() {
        this.defense = true;
    }
}
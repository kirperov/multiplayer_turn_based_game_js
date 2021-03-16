export default class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.previousPosition;
        this.previousWeapon;
        this.health = 100;
        this.weapon = "weapon_0";
    }
}
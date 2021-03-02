export default class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.previousPosition=0;
        this.health = 100;
        this.weapon = 0;
    }
}
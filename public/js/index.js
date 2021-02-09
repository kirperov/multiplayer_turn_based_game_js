import Map from './Map.js';
import Player from './Player.js';

let activePlayerOne = new Player("player_one");
let activePlayerTwo = new Player("player_two");
let obstacles = ["obstacle_one", "obstacle_two", "obstacle_three", "obstacle_four"],
    weapons = ["weapon_one", "weapon_two", "weapon_three", "weapon_four"];
let generateMap = new Map(10, 10, obstacles, weapons, activePlayerOne, activePlayerTwo);
generateMap.generateMap();
generateMap.visualizeMap();

//TODO Event listener
document.addEventListener('keydown', (e) => {
    generateMap.checkPosition(e.key, activePlayerOne.x, activePlayerOne.y);
    console.log(activePlayerOne.y);
    if (!e.repeat) {
        console.log(`Key "${e.key}" pressed  [event: keydown]`);
    } else {
        console.log(`Key "${e.key}" repeating  [event: keydown]`);
    }
});
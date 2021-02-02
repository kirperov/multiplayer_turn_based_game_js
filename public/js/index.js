import Map from './Map.js';
import Player from './Player.js';

let playerOne = new Player("player_one");
let playerTwo = new Player("player_two");
let obstacles = ["obstacle_one", "obstacle_two", "obstacle_three", "obstacle_four"],
    weapons = ["weapon_one", "weapon_two", "weapon_three", "weapon_four"];

window.addEventListener('DOMContentLoaded', (event) => {
    let generateMap = new Map(10, 10, obstacles, weapons, playerOne, playerTwo);
    generateMap.generateMap();
    generateMap.visualizeMap();
    console.log('DOM fully loaded and parsed');
});
//TODO Event listener
document.addEventListener('keydown', (e) => {
    // generateMap.checkPosition(activPlayer.x, activPlayer.y);
    playerOne.movePlayer(e,playerOne.x, playerOne.y);
    if (!e.repeat)
    console.log(`Key "${e.key}" pressed  [event: keydown]`);
    else
    console.log(`Key "${e.key}" repeating  [event: keydown]`);
});
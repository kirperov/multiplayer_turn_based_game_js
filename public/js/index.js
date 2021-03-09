import Map from './Map.js';
import Player from './Player.js';

// let activePlayerOne = new Player("player_one");
// let activePlayerTwo = new Player("player_two");
 
let activePlayers = [];


let obstacles = ["obstacle_one", "obstacle_two", "obstacle_three", "obstacle_four"],
    weapons = ["weapon_one", "weapon_two", "weapon_three", "weapon_four"];
    for(let i = 0; i<2; i++) {
        let activePlayer  = new Player("player_"+[i]);
        activePlayers.push(activePlayer);
   }
  let  generateMap = new Map(10, 10, obstacles, weapons,activePlayers[0], activePlayers[1]);

generateMap.generateMap();
generateMap.visualizeMap();

console.log(generateMap)


let startPosition = [activePlayers[0].y, activePlayers[0].x];
let activePlayer = activePlayers[0];
let nbPlayer = 0;
let switchPlayer = false;
$( "#turn").click(function() {
    if(switchPlayer == false) {
        switchPlayer = true;
        activePlayer = activePlayers[1];
        nbPlayer=1;
    } else {
        switchPlayer = false;
        activePlayer = activePlayers[0];
        nbPlayer=0;
    }
    console.log(nbPlayer)
    generateMap.generatedMap[activePlayer.y][ activePlayer.x] = activePlayer.name;
    startPosition = [activePlayer.y, activePlayer.x];
    activePlayer.previousPosition = parseInt(activePlayer.y)+""+parseInt(activePlayer.x);
});


document.addEventListener('keydown', (e) => {
    let previousPosition = parseInt(activePlayer.previousPosition);
    generateMap.makeStep(e.key, activePlayer.x, activePlayer.y, startPosition, previousPosition,nbPlayer);
    if (!e.repeat) {
        console.log(`Key "${e.key}" pressed  [event: keydown]`);
    } else {
        console.log(`Key "${e.key}" repeating  [event: keydown]`);
    }
});


import Map from './Map.js';
import Player from './Player.js';
import Weapon from './Weapon.js';

let players = [];
let listWeapons = [];

let obstacles = [
    "obstacle_one",
    "obstacle_two",
    "obstacle_three",
    "obstacle_four"
];

let lengthPlayers = 2;
let lengthWeapons = 4;
// Initalisation des joueurs
for(let i = 0; i<lengthPlayers; i++) {
    let player = new Player("player_"+[i]);
    players.push(player);
}

//Initialisation des armes
for(let i = 0; i < lengthWeapons; i++) {
    let weapon = new Weapon("weapon_"+[i]);
    listWeapons.push(weapon);
}

//Initialisation de la carte
let map = new Map(10, 10, obstacles, listWeapons, players[0], players);
map.generateMap();
map.visualizeMap();
let startPosition = [map.activePlayer.y, map.activePlayer.x]; 

// Changement de joueur
$( "#turn").on("click", function() {
    $(".case__can_go").removeClass('case__can_go');
    if (map.activePlayer === players[0]) {
        map.activePlayer = players[1];
        map.backLightBlocks();
    } else {
        map.activePlayer = players[0];
        map.backLightBlocks();
    }
    startPosition = [map.activePlayer.y, map.activePlayer.x];
    map.activePlayer.previousPosition = null;
   
    console.log(map.generatedMap)
});

// Appel à la méthode de déplacement en fonction de la touche
document.addEventListener('keydown', (e) => {
    map.makeStep(e.key, startPosition);
    if (!e.repeat) {
        console.log(`Key "${e.key}" pressed  [event: keydown]`);
    } else {
        console.log(`Key "${e.key}" repeating  [event: keydown]`);
    }
});


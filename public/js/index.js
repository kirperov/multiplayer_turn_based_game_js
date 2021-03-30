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


//Initialisation des armes
for(let i = 0; i < lengthWeapons; i++) {
    let dommageIndex=i+1+'0';
    let weapon = new Weapon("weapon_"+[i], parseInt(dommageIndex));
    listWeapons.push(weapon);
}

// Initalisation des joueurs
for(let i = 0; i<lengthPlayers; i++) {
    let player = new Player("player_"+[i]);
    player.weapon = listWeapons[0];
    players.push(player);
    console.log(player.weapon)
}

console.log(players)
//Initialisation de la carte
let map = new Map(10, 10, obstacles, listWeapons, players[0], players);
map.generateMap();
map.visualizeMap();
let startPosition = [map.activePlayer.y, map.activePlayer.x]; 
map.showWaysToGo(startPosition[0], startPosition[1])

// Changement de joueur
$( "#turn").on("click", function() {
    $(".case__can_go").removeClass('case__can_go');
    map.switchPlayer();
    map.showWaysToGo(map.activePlayer.y, map.activePlayer.x);
    startPosition = [map.activePlayer.y, map.activePlayer.x];
    map.activePlayer.previousPosition = null;
    console.log(map.generatedMap)
});

// attaquer le joueur
$( "#attack").on("click", function() {
    map.toFight();
    console.log(players)
});

// Se defendre
$("#to-defend").on("click", function() {
    map.toBlockTheAttack();
    console.log(players)
});

// Appel à la méthode de déplacement en fonction de la touche
document.addEventListener('keydown', (e) => {
    console.log(map.activePlayer)
    map.makeStep(e.key, startPosition);
    if (!e.repeat) {
        console.log(`Key "${e.key}" pressed  [event: keydown]`);
    } else {
        console.log(`Key "${e.key}" repeating  [event: keydown]`);
    }
});

import Map from './Map.js';
import Player from './Player.js';
import Weapon from './Weapon.js';

let activePlayers = [];
let listWeapons = [];
let obstacles = [
    "obstacle_one",
    "obstacle_two",
    "obstacle_three",
    "obstacle_four"
];

// Initalisation des joueurs
for(let i = 0; i<2; i++) {
    let activePlayer  = new Player("player_"+[i]);
    activePlayers.push(activePlayer);
}

//Initialisation des armes
for(let i = 0; i < 4; i++) {
    let weapon = new Weapon("weapon_"+[i]);
    listWeapons.push(weapon);
}

//Initialisation de la carte
let generateMap = new Map(10, 10, obstacles, listWeapons, activePlayers);
generateMap.generateMap();
generateMap.visualizeMap();

let startPosition = [activePlayers[0].y, activePlayers[0].x];
let activePlayer = activePlayers[0];
let nbPlayer = 0;

// Changement de joueur
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

    //Mise à jour la carte avec la nouvelle position des joueurs
    for(let i = 0; i<2;i++) {
        console.log(activePlayers[i].name)
        generateMap.generatedMap[activePlayers[i].y][ activePlayers[i].x] = activePlayers[i].name;
    }

    // Initialisation de la position de départ et enregistrement de la position d'avant
    startPosition = [activePlayer.y, activePlayer.x];
    activePlayer.previousPosition = parseInt(activePlayer.y)+""+parseInt(activePlayer.x);
});

// Appel à la méthode de déplacement en fonction de la touche
document.addEventListener('keydown', (e) => {
    let previousPosition = parseInt(activePlayer.previousPosition);
    generateMap.makeStep(e.key, activePlayer.x, activePlayer.y, startPosition, previousPosition,nbPlayer);
    if (!e.repeat) {
        console.log(`Key "${e.key}" pressed  [event: keydown]`);
    } else {
        console.log(`Key "${e.key}" repeating  [event: keydown]`);
    }
});


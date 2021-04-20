import Map from './Map.js';
import Player from './Player.js';
import Weapon from './Weapon.js';
import Game from './Game.js';

// let players = [];
// let listWeapons = [];

// let obstacles = [
//     "obstacle_one",
//     "obstacle_two",
//     "obstacle_three",
//     "obstacle_four"
// ];

let game = new Game();
game.initGame();
// let lengthPlayers = 2;
// //Initialisation des armes
// let weapons = ["Crowbar", "Gun", "Ak-47", "Gatling"];
// for(let i = 0; i < weapons.length; i++) {
//     let dommageIndex=i+1+'0';
//     let weapon = new Weapon("weapon_"+[i], parseInt(dommageIndex), weapons[i]);
//     listWeapons.push(weapon);
// }

// // Initalisation des joueurs
// for(let i = 0; i<lengthPlayers; i++) {
//     let player = new Player("player_"+[i]);
//     player.weapon = listWeapons[0];
//     players.push(player);
// }

// console.log(players)
// //Initialisation de la carte
// let map = new Map(10, 10, obstacles, listWeapons, players[0], players);
// map.generateMap();
// map.visualizeMap();
// map.activePlayer.startPosition = [map.activePlayer.y, map.activePlayer.x];
// map.showWaysToGo(map.possiblesWays(map.activePlayer.y, map.activePlayer.x))

// // Changement de joueur
// $( "#turn").on("click", function() {
//     map.turnPlayer();
// });

// // attaquer le joueur
// $( "#attack").on("click", function() {
//     map.toFight();
// });

// // Se defendre
// $("#to-defend").on("click", function() {
//     map.activePlayer.toBlockTheAttack();
//     map.switchPlayer();
// });

game.turnPlayer();

// Appel à la méthode de déplacement en fonction de la touche
// document.addEventListener('keydown', (e) => {
//     console.log(map.activePlayer)
//     map.makeStep(e.key);
//     if (!e.repeat) {
//         console.log(`Key "${e.key}" pressed  [event: keydown]`);
//     } else {
//         console.log(`Key "${e.key}" repeating  [event: keydown]`);
//     }
// });

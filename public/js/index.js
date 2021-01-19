import Map from './Map.js';
import Player from './Player.js';

let playerOne = new Player("player_one");
let playerTwo = new Player("player_two");
let obstacles = ["obstacle_one", "obstacle_two", "obstacle_three", "obstacle_four"],
weapons = ["weapon_one", "weapon_two", "weapon_three", "weapon_four"];
let generateMap=new Map(10, 10, obstacles, weapons, playerOne, playerTwo);
 
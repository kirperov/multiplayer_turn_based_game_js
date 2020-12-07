export default class Map {
    constructor(x, y, obstacles, players, weapons) {
        this.x = x;
        this.y = y;
        this.obstacles = obstacles;
        this.players = players;
        this.weapons = weapons;
        this.generatedMap = [];
    }

    createMatrix() {
        for(let i = 0; i < this.y; i++) {
            //axe y
            this.generatedMap[i] = [];
            for(let n = 0; n < this.x; n++) {
                //axe x
                this.generatedMap[i][n] = 0;
            }
        }
    }

    generateRandomNumber(num) {
        return Math.floor((Math.random() * num));
    }
    
    genrateObstacles() {
        for(let i = 0; i < this.y; i++) {
            let numberRand = this.generateRandomNumber(this.y * 0.4);
            for(let n = 0; n < numberRand; n++) {
                let obstNbRand = this.generateRandomNumber(this.obstacles.length);
                let caseNbRand = this.generateRandomNumber(this.y);
                if(this.generatedMap[i][caseNbRand] == 0) {
                    this.generatedMap[i][caseNbRand] = this.obstacles[obstNbRand];
                }
            }
        }
    }

    generatePlayers() {
        let players = this.players;
        for(let i = 0; i < players.length; i++) {
            let positioned = false;
            while(positioned == false) {
                let nbRand = this.generateRandomNumber(this.generatedMap.length);   
                let nbRand2 = this.generateRandomNumber(this.generatedMap[i].length);   
                if(this.generatedMap[nbRand][nbRand2] == 0) {
                    this.generatedMap[nbRand][nbRand2] = players[i];
                    positioned = true;
                }
                console.log("x : " +  nbRand2 + "; y : " + nbRand + this.players[i]);
            }
        }
    }

    generateWeapons() {
        let weapons = this.weapons;
        for(let i = 0; i < weapons.length; i++) {
            let positioned = false;
            while(positioned == false) {
                let nbRandY = this.generateRandomNumber(this.generatedMap.length);   
                let nbRandX = this.generateRandomNumber(this.generatedMap[i].length);
                if(this.generatedMap[nbRandY][nbRandX] == 0) {
                    this.generatedMap[nbRandY][nbRandX] = weapons[i];
                    positioned = true;
                }
            }
        }
    }

    generateMap() {
        this.createMatrix(this.x, this.y);
        this.genrateObstacles();
        this.generatePlayers();
        this.generateWeapons();
        for(let i = 0; i <this.generatedMap.length; i++) {
            console.log(this.generatedMap[i]);
        }
    }
}

let obstacles = ["ob1", "ob2", "ob3", "ob4"],
    players = ["p1", "p2"],
    weapons = ["w1", "w2", "w3", "w4"];
let generateMap=new Map(10, 10, obstacles, players, weapons);
generateMap.generateMap();
 
 
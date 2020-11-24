export default class GenerateMap {
    constructor(obstacles,players,weapons) {
        this.obstacles = obstacles;
        this.players = players;
        this.weapons = weapons;
    }

    createMatrix(x,y) {
        let map = [],
            row = [],
            boxes = 0;
        //axe x
        for(let i = 0; i < x; i++) {
            row.push(boxes);
        }
        //axe y
        for(let i = 0; i < y; i++) {
            map.push(row);
        }
        return map;
    }

    generateRandomNumber(num) {
        return Math.floor((Math.random() * num));
    }

    generateMap() {
        let matrix = this.createMatrix(10,10);
        // console.log(matrix)
        let generatedMap = [];
        for(let i = 0; i < matrix.length; i++) {
            matrix = this.createMatrix(10,10);
            let numberRand = this.generateRandomNumber(matrix[i].length * 0.4);
            for(let n = 0; n < numberRand; n++) {
                let obstNbRand = this.generateRandomNumber(this.obstacles.length);
                let caseRand = this.generateRandomNumber(matrix[i].length);
                matrix[i][caseRand] = this.obstacles[obstNbRand];
            }
            generatedMap.push(matrix[i]);
             console.log(generatedMap[i]);
        }
    }
}

let obstacles = ["ob1", "ob2", "ob3", "ob4"],
    players = ["p1", "p2"],
    weapons = ["w1", "w2", "w3", "w4"];
let generateMap=new GenerateMap(obstacles,players,weapons);
generateMap.generateMap()
 
 
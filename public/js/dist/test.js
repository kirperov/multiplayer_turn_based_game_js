let elements = {
    obstacles: ["ob1", "ob2", "ob3", "ob4"],
    players: ["p1", "p2"],
    weapons: ["w1", "w2", "w3", "w4"],
    matrix:[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]
}
/*TODO boucle matrix*/

export default class GenerateMap {
    constructor(elements) {
        this.elements = elements;
    }
    generateRandomNumber(num) {
        return Math.floor((Math.random() * num));
    }

    generateMap() {
        let generatedMap=[];
        for(let i = 0; i < this.elements.matrix.length; i++) {
            let numberRand = this.generateRandomNumber(this.elements.matrix[i].length * 0.4);
            for(let n = 0; n<numberRand;n++) {
                let obstNbRand = this.generateRandomNumber(this.elements.obstacles.length);
                let caseRand = this.generateRandomNumber(this.elements.matrix[i].length);
                this.elements.matrix[i][caseRand] = this.elements.obstacles[obstNbRand];
            }
            generatedMap.push(this.elements.matrix[i]);
            console.log(generatedMap[i]);

        }

    }
}
let generateMap=new GenerateMap(elements);
generateMap.generateMap();
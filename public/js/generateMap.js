

let elements = {
    obstacles: ["ob1", "ob2", "ob3", "ob4"],
    players: ["p1", "p2"],
    weapons: ["w1", "w2", "w3", "w4"],
    map:[
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

export default class GenerateMap {
    constructor(elements) {
        this.elements = elements;
    }
    generateRandomNumber(num) {
        return Math.floor((Math.random() * num));
    }

    generateMap() {
        let generatedMap=[];
        for(let i = 0; i < this.elements.map.length; i++) {
            let numberRand = this.generateRandomNumber(this.elements.map[i].length);
            for(let n = 0; n<this.elements.obstacles.length;n++) {
                let obstNbRand = this.generateRandomNumber(this.elements.obstacles[n].length);
                this.elements.map[i].splice(numberRand,1,this.elements.obstacles[obstNbRand]);
            }
            generatedMap.push(this.elements.map[i]);
            console.log(generatedMap[i]);
        }
    }
}
let generateMap=new GenerateMap(elements);
generateMap.generateMap();
 
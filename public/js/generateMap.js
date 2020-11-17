
let elements = {
    obstacle:"ob",
    playerOne:"p1",
    playerTwo:"p2",
    weapon:"w"
}

export default class GenerateMap {
    generateRandomNumber(num) {
        return Math.floor((Math.random() * num));
    }
    arrayMap(elements) {
        let tableau = [
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
        ];  
        for(let i = 0; i < tableau.length; i++) {
            let numberRand = this.generateRandomNumber(tableau[i].length);
            tableau[i].splice(numberRand,1,elements.obstacle);
            console.log(tableau[i])
        }
    }
}
let generateMap=new GenerateMap();
generateMap.arrayMap(elements);
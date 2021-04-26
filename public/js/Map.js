export default class Map {
    constructor(x, y, obstacles, listWeapons, activePlayer, players) {
        this.x = x;
        this.y = y;
        this.obstacles = obstacles;
        this.weapons = listWeapons;
        this.generatedMap = [];
        this.activePlayer = activePlayer;
        this.players = players;
        this.onFight = false;
    }

    //Creation of the empty map with the width and length
    createMatrix() {
        for (let i = 0; i < this.y; i++) {
            //axe y
            this.generatedMap[i] = [];
            for (let n = 0; n < this.x; n++) {
                //axe x
                this.generatedMap[i][n] = 0;
            }
        }
    }

    //Generate random number based on num parameter
    generateRandomNumber(num) {
        let randNumber =  Math.floor((Math.random() * num));
        if (randNumber !== -1) {
            return Math.floor((Math.random() * num));
        }
    }
    
    //Positioning of players on the map
    positionPlayer() {
        for (let i = 0; i < this.players.length; i++) {
            let positionned = false;
            while(positionned == false) {
                let nbRandX = this.generateRandomNumber(this.generatedMap.length),
                    nbRandY = this.generateRandomNumber(this.generatedMap.length); 
                if (this.generatedMap[nbRandY][nbRandX] == 0) {
                    let topCase = "ob",
                        downCase = "ob",
                        leftCase = "ob",
                        rightCase = "ob";
                    //Verification top case
                     if (nbRandY -1 >= 0) {
                        if (this.generatedMap[nbRandY -1][nbRandX] == this.players[0].name || this.generatedMap[nbRandY -1][nbRandX] == this.players[1].name) {
                            continue;
                        } else {
                            topCase = this.generatedMap[nbRandY -1][nbRandX];
                        }
                    }
                    //Verification down case
                    if (nbRandY +1 < this.y) {
                        if (this.generatedMap[nbRandY +1][nbRandX] == this.players[0].name || this.generatedMap[nbRandY +1][nbRandX] == this.players[1].name) {
                            continue;
                        } else {
                            downCase = this.generatedMap[nbRandY +1][nbRandX];
                        }
                    }
                    //Verification left case
                    if (nbRandX -1 >= 0) {
                        if (this.generatedMap[nbRandY][nbRandX -1] == this.players[0].name || this.generatedMap[nbRandY][nbRandX -1] == this.players[1].name) {
                            continue;
                        } else {
                            leftCase = this.generatedMap[nbRandY][nbRandX -1];
                        }
                    }
                    //Verification right case
                    if (nbRandX +1 < this.x) {
                        if (this.generatedMap[nbRandY][nbRandX +1] == this.players[0].name || this.generatedMap[nbRandY][nbRandX +1] == this.players[1].name) {
                            continue;
                        } else {
                            rightCase = this.generatedMap[nbRandY][nbRandX +1];
                        }
                    }
                    //Verification obstacles
                    if (topCase.toString().includes('ob') && downCase.toString().includes('ob') && leftCase.toString().includes('ob') && rightCase.toString().includes('ob')) {
                        continue;
                    } else {
                        this.generatedMap[nbRandY][nbRandX] = this.players[i].name;
                        this.players[i].x = nbRandX;
                        this.players[i].y = nbRandY;
                    }
                    positionned = true;    
                } 
            }
        }
    }

    //Positioning weapons on the map
    positionWeapon() {
        let weaponsLength = this.weapons.length;
        for (let i = 0; i < weaponsLength; i++) {
            let positionned = false;
            while(positionned == false) {
                let nbRandX = this.generateRandomNumber(this.generatedMap.length),
                    nbRandY = this.generateRandomNumber(this.generatedMap.length); 
                if (this.generatedMap[nbRandY][nbRandX] == 0) {
                    this.generatedMap[nbRandY][nbRandX] = this.weapons[i].weapon;
                } else {
                    continue;
                }
                positionned = true;
            }
        }
    }

    //Positioning of obstacles on the map
    positionObstacle() {
        let lengthAxeY = this.y;
        for (let i = 0; i < lengthAxeY; i++) {
            let numberRand = this.generateRandomNumber(this.y * 0.4);
            for (let n = 0; n < numberRand; n++) {
                let positionned = false;
                while(positionned == false) {
                    let obstNbRand = this.generateRandomNumber(this.obstacles.length),
                        caseNbRand = this.generateRandomNumber(this.y);
                    if (this.generatedMap[i][caseNbRand] == 0) {
                        this.generatedMap[i][caseNbRand] = this.obstacles[obstNbRand];
                        positionned = true;
                    } else {
                        continue;
                    }
                }
            }
        }
    }

    //Creation of the map with the generated elements
    generateMap() {
        this.createMatrix();
        this.positionPlayer();
        this.positionWeapon();
        this.positionObstacle();
    }

    createRowOnGrid(container, numberRow) {
        let rowX = $('<div id="row-'+[numberRow]+ '"' + 'class="map__row"></div>');
        for (let n = 0; n < this.generatedMap[numberRow].length; n++) {
            //Creation blocks
            let caseDiv = $("<div></div>");
                caseDiv.addClass("case");
                caseDiv.attr('id', "case-"+[numberRow]+[n]);
                caseDiv.text(this.generatedMap[numberRow][n]);
                container.append(rowX);
                rowX.append(caseDiv);
            //Add classes according to blocks generated
            caseDiv.each(function() {
                let classCase = 'case__'+$(this).text();
                $(this).empty();
                $(this).addClass(classCase);
            });
        } 
    }

    //Visualize map into the DOM
    visualizeMap() {
        //Creation field for cases
        let container = $(".map");
        for (let i = 0; i < this.generatedMap.length; i++) {
            this.createRowOnGrid(container, i);
        }
    }
}
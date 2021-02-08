export default class Map {
    constructor(x, y, obstacles, weapons, activePlayerOne, activePlayerTwo) {
        this.x = x;
        this.y = y;
        this.obstacles = obstacles;
        this.weapons = weapons;
        this.generatedMap = [];
        this.players = [activePlayerOne, activePlayerTwo];
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
    
    positionElement(type, array) {
        let count;
        if(type=="obstacles") {
            count = this.y;
        } else {
            count = array.length;
        }
        for(let i = 0; i<count; i++) {
            let positioned = false;
            let nbRandX = this.generateRandomNumber(this.generatedMap.length);   
            let nbRandY = this.generateRandomNumber(this.generatedMap.length);  
            switch(type) {
                case'players':
                if(this.generatedMap[nbRandY][nbRandX] == 0) {
                    let topCase = "ob";
                    let downCase = "ob";
                    let leftCase = "ob";
                    let rightCase = "ob";
                    while(positioned==false) {
                        //Verification top case
                        if(typeof this.generatedMap[nbRandY -1]  !== "undefined") {
                            if(this.generatedMap[nbRandY -1][nbRandX] == array[0].name || this.generatedMap[nbRandY -1][nbRandX] == array[1].name) {
                                continue;
                            } else {
                                topCase = this.generatedMap[nbRandY -1][nbRandX];
                            }
                        } 
                        //Verification down case
                        if(typeof this.generatedMap[nbRandY +1] !== "undefined") {
                            if(this.generatedMap[nbRandY +1][nbRandX] == array[0].name || this.generatedMap[nbRandY +1][nbRandX] == array[1].name) {
                                continue;
                            } else {
                                downCase = this.generatedMap[nbRandY +1][nbRandX];
                            }
                        } 
                        //Verification left case
                        if(typeof this.generatedMap[nbRandY][nbRandX -1] !== "undefined") {
                            if(this.generatedMap[nbRandY][nbRandX -1] == array[0].name || this.generatedMap[nbRandY][nbRandX -1] == array[1].name) {
                                continue;
                            } else {
                                leftCase = this.generatedMap[nbRandY][nbRandX -1];
                            }
                        }  
                        //Verification right case
                        if(typeof this.generatedMap[nbRandY][nbRandX +1] !== "undefined") {
                            if(this.generatedMap[nbRandY][nbRandX +1] == array[0].name || this.generatedMap[nbRandY][nbRandX +1] == array[1].name) {
                            continue; 
                            } else {
                                rightCase = this.generatedMap[nbRandY][nbRandX +1];
                            }
                        }
                        //Verification obstacles
                        if(topCase.toString().includes('ob') && downCase.toString().includes('ob') && leftCase.toString().includes('ob') && rightCase.toString().includes('ob')) {
                            continue; 
                        } else {
                            this.generatedMap[nbRandY][nbRandX] = array[i].name;
                            this.players[i].x = nbRandX;
                            this.players[i].y = nbRandY;
                        }
                        positioned = true;  
                    }
                } else {
                    continue;
                }
                break;
                case 'weapons':
                    if(this.generatedMap[nbRandY][nbRandX] == 0) {
                        this.generatedMap[nbRandY][nbRandX] = array[i];
                        positioned = true;
                    }
                    else {
                        continue;
                    }
                break;  
                case 'obstacles':
                    let numberRand = this.generateRandomNumber(this.y * 0.4);
                        for(let n = 0; n < numberRand; n++) {
                            while(positioned == false) {
                                let obstNbRand = this.generateRandomNumber(array.length);
                                let caseNbRand = this.generateRandomNumber(this.y);
                                if(this.generatedMap[i][caseNbRand] == 0) {
                                    positioned = true;
                                    this.generatedMap[i][caseNbRand] = array[obstNbRand];
                                }
                                else {
                                    continue;
                                }
                            }
                        }
                break;
            }  
        }
    }

    generateMap() {
        this.createMatrix(this.x, this.y);
        this.positionElement("obstacles",  this.obstacles);
        this.positionElement("weapons",  this.weapons);
        this.positionElement("players",  this.players);
    }

    checkPosition(action, playerPositionX, playerPositionY) {
       
        switch(action) {
            case "ArrowUp":
                if(this.generatedMap[playerPositionY][playerPositionX -1] == "obstacle_one") {
                    console.log("ok");
                    console.log(this.generatedMap[playerPositionX][playerPositionY -1])
                } else {
                    console.log('not ok');
                    console.log(this.generatedMap[playerPositionY][playerPositionX -1])
                }
            console.log('arrow up');
            break;
            case "ArrowDown":
            console.log('arrow down');
            break;
            case "ArrowLeft":
            console.log('arrow left');
            break;
            case "ArrowRight":
            console.log('arrow right');
            break;
        }
 
    }

    visualizeMap() {
        // Creation field for cases
        let container = $(".map-grid");
        for(let i = 0; i < this.generatedMap.length; i++) {
            let rowX = $('<div id="row-'+[i]+ '"' + 'class="map-grid__row"></div>');
            for(let n = 0; n < this.generatedMap[i].length; n++) {
                // Creation cases
                let caseDiv = $("<div></div>");
                caseDiv.addClass("case");
                caseDiv.attr('id', "case-"+[i]+[n]);
                caseDiv.text(this.generatedMap[i][n]);
                container.append(rowX);
                rowX.append(caseDiv);
                
                // Attribution des classes en fonction des cases
                caseDiv.each(function() {
                    let classCase = 'case__'+$(this).text();
                    $(this).empty();
                    $(this).addClass(classCase);
                });
            }           
        }
    }
}

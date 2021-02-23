export default class Map {
    constructor(x, y, obstacles, weapons, activePlayerOne, activePlayerTwo) {
        this.x = x;
        this.y = y;
        this.obstacles = obstacles;
        this.weapons = weapons;
        this.generatedMap = [];
        this.players = [activePlayerOne, activePlayerTwo];
    }

    //Création de la carte vide avec la largeur et la longeur
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
    
    //Positionner les éléments sur la carte et vérifier les cases
    positionElement(type, array) {
        let count;
        if(type=="obstacles") {
            count = this.y;
        } else {
            count = array.length;
        }
        for(let i = 0; i<count; i++) {
            let positioned = false,
                nbRandX = this.generateRandomNumber(this.generatedMap.length),
                nbRandY = this.generateRandomNumber(this.generatedMap.length);  
            switch(type) {
                case'players':
                if(this.generatedMap[nbRandY][nbRandX] == 0 && this.generatedMap[nbRandY][nbRandX] !== this.players[0].name || this.generatedMap[nbRandY][nbRandX] !== this.players[1].name) {
                    let topCase = "ob",
                        downCase = "ob",
                        leftCase = "ob",
                        rightCase = "ob";
                    while(positioned==false) {
                        //Verification top case
                        if(typeof this.generatedMap[nbRandY -1]  !== "undefined") {
                            if(this.generatedMap[nbRandY -1][nbRandX] == this.players[0].name || this.generatedMap[nbRandY -1][nbRandX] == this.players[1].name) {
                                continue;
                            } else {
                                topCase = this.generatedMap[nbRandY -1][nbRandX];
                            }
                        } 
                        //Verification down case
                        if(typeof this.generatedMap[nbRandY +1] !== "undefined") {
                            if(this.generatedMap[nbRandY +1][nbRandX] == this.players[0].name || this.generatedMap[nbRandY +1][nbRandX] == this.players[1].name) {
                                continue;
                            } else {
                                downCase = this.generatedMap[nbRandY +1][nbRandX];
                            }
                        } 
                        //Verification left case
                        if(typeof this.generatedMap[nbRandY][nbRandX -1] !== "undefined") {
                            if(this.generatedMap[nbRandY][nbRandX -1] == this.players[0].name || this.generatedMap[nbRandY][nbRandX -1] == this.players[1].name) {
                                continue;
                            } else {
                                leftCase = this.generatedMap[nbRandY][nbRandX -1];
                            }
                        }  
                        //Verification right case
                        if(typeof this.generatedMap[nbRandY][nbRandX +1] !== "undefined") {
                            if(this.generatedMap[nbRandY][nbRandX +1] == this.players[0].name || this.generatedMap[nbRandY][nbRandX +1] == this.players[1].name) {
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
                    if(this.generatedMap[nbRandY][nbRandX] == 0 && this.generatedMap[nbRandY][nbRandX] !== this.players[0].name && this.generatedMap[nbRandY][nbRandX] !== this.players[1].name) {
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
                                let obstNbRand = this.generateRandomNumber(array.length),
                                    caseNbRand = this.generateRandomNumber(this.y);
                                if(this.generatedMap[i][caseNbRand] == 0 && this.generatedMap[i][caseNbRand] !== this.players[0].name && this.generatedMap[i][caseNbRand] !== this.players[1].name) {
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

    // Récupère la position et le nom de la case selon la direction de flèche
    getPosition(direction, playerPositionX, playerPositionY) {
      
        let oldPosition = [playerPositionY,playerPositionX],
            newPosition = [playerPositionY,playerPositionX],
            caseName;
        if(direction == "ArrowUp" || direction == "ArrowDown") {
            direction =="ArrowUp" ? newPosition[0] = playerPositionY-1 : newPosition[0] = playerPositionY+1;
            caseName = this.generatedMap[newPosition[0]][playerPositionX];
        } else {
            direction =="ArrowLeft" ? newPosition[1] = playerPositionX-1 : newPosition[1] = playerPositionX+1;
            caseName = this.generatedMap[playerPositionY][newPosition[1]];
        }
        return [oldPosition, newPosition, caseName];
    }

    //Verification de la case si weapon ou obstacle
    checkPosition(direction, playerPositionX, playerPositionY, startPosition) {

        let listPositions = this.getPosition(direction, playerPositionX, playerPositionY),
            namePosition =  listPositions[2],             
            newPositionY = listPositions[1][0],
            newPositionX = listPositions[1][1];

            let upBlock = startPosition[0] - 4,
                downBlock = startPosition[0] + 4,
                leftBlock = startPosition[1] - 4,
                rightBlock = startPosition[1] + 4;
            
            let startCoordinates = parseInt(startPosition[0]+""+startPosition[1]);
            let newCoordinates = parseInt(newPositionY+""+newPositionX);
            let oldPositionY =  startPosition[0];
            let oldPositionX = startPosition[1];
            console.log("Start position: "+startCoordinates);
            console.log("New Position: "+newCoordinates);
        if($.inArray(namePosition, this.obstacles) == -1) {
            if(newPositionY !== upBlock && newPositionY !== downBlock && newPositionX !== leftBlock && newPositionX !== rightBlock && newPositionY !== "undefined" && newPositionX !== "undefined") {
                if(newPositionX == oldPositionX) {
                    this.players[0].y  = newPositionY;
                    this.players[0].x  = newPositionX;  
                    this.updateMap(listPositions);
                } else if(newPositionY == oldPositionY) {          
                    this.players[0].y  = newPositionY;
                    this.players[0].x  = newPositionX;  
                    this.updateMap(listPositions);
                } else {
                    console.log('block')
                }
            } else {
                console.log("stop");
            }

            if($.inArray(namePosition, this.weapons) !== -1) {
                console.log("case weapon "+ '['+namePosition+']');
                this.players[0].weapon  = namePosition;
            } else {
                console.log("case vide "+ '['+namePosition+']')
            }
        } else {    
            console.log("case obstacle "+ '['+namePosition+']')
        }
    }

    // Check position avant modifier la carte
    makeStep(action, playerPositionX, playerPositionY, startPosition) {
        switch(action) {
            case "ArrowUp":
                console.log('arrow up');
                    this.checkPosition("ArrowUp", playerPositionX, playerPositionY, startPosition);
            break;
            case "ArrowDown":
                console.log('arrow down');
                    this.checkPosition("ArrowDown", playerPositionX, playerPositionY, startPosition);
            break;
            case "ArrowLeft":
                console.log('arrow left');
                    this.checkPosition("ArrowLeft", playerPositionX, playerPositionY, startPosition);
            break;
            case "ArrowRight":
                console.log('arrow right');
                    this.checkPosition("ArrowRight", playerPositionX, playerPositionY, startPosition);
            break;
        }
    }
    //Update map ajax
    updateMap(listPositions) {
        let oldPositionY = listPositions[0][0],
            oldPositionX = listPositions[0][1],
            newPositionY = listPositions[1][0],
            newPositionX = listPositions[1][1],
            positionName = listPositions[2];
        $.ajax({
            success: function(){
            $("#case-"+oldPositionY+oldPositionX).removeClass("case__player_one");
            $("#case-"+newPositionY+newPositionX).addClass("case__player_one")
        }});
    }

    //Visualiser la carte dans le DOM
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

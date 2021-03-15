export default class Map {
    constructor(x, y, obstacles, listWeapons, activePlayers) {
        this.x = x;
        this.y = y;
        this.obstacles = obstacles;
        this.weapons = listWeapons;
        this.generatedMap = [];
        this.players = activePlayers;
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
        let randNumber =  Math.floor((Math.random() * num));
        if(randNumber !== -1) {
            return Math.floor((Math.random() * num));

        }
    }
    
    positionPlayer(array) {
        for(let i = 0; i < this.players.length; i++) {
            let positionned = false;
 
            while(positionned == false) {
                let nbRandX = this.generateRandomNumber(this.generatedMap.length),
                    nbRandY = this.generateRandomNumber(this.generatedMap.length); 
                if(this.generatedMap[nbRandY][nbRandX] == 0) {
                    let topCase = "ob",
                        downCase = "ob",
                        leftCase = "ob",
                        rightCase = "ob";
                    //Verification top case
                     if(nbRandY -1 >= 0) {
                        if(this.generatedMap[nbRandY -1][nbRandX] == this.players[0].name || this.generatedMap[nbRandY -1][nbRandX] == this.players[1].name) {
                            continue;
                        } else {
                            topCase = this.generatedMap[nbRandY -1][nbRandX];
                        }
                    }
                    //Verification down case
                    if(nbRandY +1 < this.y) {
                        if(this.generatedMap[nbRandY +1][nbRandX] == this.players[0].name || this.generatedMap[nbRandY +1][nbRandX] == this.players[1].name) {
                            continue;
                        } else {
                            downCase = this.generatedMap[nbRandY +1][nbRandX];
                        }
                    }
                    //Verification left case
                    if(nbRandX -1 >= 0) {
                        if(this.generatedMap[nbRandY][nbRandX -1] == this.players[0].name || this.generatedMap[nbRandY][nbRandX -1] == this.players[1].name) {
                            continue;
                        } else {
                            leftCase = this.generatedMap[nbRandY][nbRandX -1];
                        }
                    }
                    //Verification right case
                    if(nbRandX +1 < this.x) {
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
                        this.generatedMap[nbRandY][nbRandX] = this.players[i].name;
                        this.players[i].x = nbRandX;
                        this.players[i].y = nbRandY;
                    }
                    positionned = true;    
                } 
            }
        }
    }

    positionWeapon(array) {
        for(let i = 0; i < array.length; i++) {
            let positionned = false;
            while(positionned == false) {
                let nbRandX = this.generateRandomNumber(this.generatedMap.length),
                    nbRandY = this.generateRandomNumber(this.generatedMap.length); 
                if(this.generatedMap[nbRandY][nbRandX] == 0) {
                    this.generatedMap[nbRandY][nbRandX] = array[i].weapon;
                } else {
                    continue;
                }
                positionned = true;
            }
        }
    }

    positionObstacle(array) {
        for(let i = 0; i < this.y; i++) {
            let numberRand = this.generateRandomNumber(this.y * 0.4);
            for(let n = 0; n < numberRand; n++) {
                let positionned = false;
                while(positionned == false) {
                    let obstNbRand = this.generateRandomNumber(array.length),
                        caseNbRand = this.generateRandomNumber(this.y);
                    if(this.generatedMap[i][caseNbRand] == 0) {
                        this.generatedMap[i][caseNbRand] = array[obstNbRand];
                        positionned = true;
                    } else {
                        continue;
                    }
                }
            }
        }
    }

    generateMap() {
        this.createMatrix(this.x, this.y);
        this.positionPlayer(this.players);
        console.log("joueur positionné")
        this.positionWeapon(this.weapons);
        console.log("armes positionné")
        this.positionObstacle(this.obstacles);
        console.log("obstacles positionné")
    }
    getPosition(direction, playerPositionX, playerPositionY) {
        let previousPosition = [playerPositionY,playerPositionX],
            newPosition = [playerPositionY,playerPositionX],
            caseName;

        switch(direction) {
            case "ArrowUp":
                newPosition[0] = playerPositionY-1;
                caseName = this.generatedMap[newPosition[0]][playerPositionX];
                break;
            case "ArrowDown":
                newPosition[0] = playerPositionY+1;
                caseName = this.generatedMap[newPosition[0]][playerPositionX]
                break;
            case "ArrowLeft":
                newPosition[1] = playerPositionX-1;
                caseName = this.generatedMap[playerPositionY][newPosition[1]];
                break;
            case "ArrowRight":
                newPosition[1] = playerPositionX+1;
                caseName = this.generatedMap[playerPositionY][newPosition[1]];
                break;
        }
        return [previousPosition, newPosition, caseName];
    }

    //Verification de la case si weapon ou obstacle
    checkPosition(direction, playerPositionX, playerPositionY, startPosition, previousPosition, nbPlayer) {
        console.log(this.players)
        let listPositions = this.getPosition(direction, playerPositionX, playerPositionY),
            namePosition =  listPositions[2],             
            currentPositionY = listPositions[1][0],
            currentPositionX = listPositions[1][1],

            previousPositionY =  startPosition[0],
            previousPositionX = startPosition[1],
            
            maxBlocksToGo = 4,
            upBlock = startPosition[0] - maxBlocksToGo,
            downBlock = startPosition[0] + maxBlocksToGo,
            leftBlock = startPosition[1] - maxBlocksToGo,
            rightBlock = startPosition[1] + maxBlocksToGo,
            currentPosition = parseInt(currentPositionY)+""+parseInt(currentPositionX);
            
        // Logs positions
        console.log("Start position: " + "["+startPosition+"]");
        console.log("New Position: "+ "["+currentPosition+"]");
        console.log("Previous Position: " +"["+previousPosition+"]");
        // Vérification si la case n'est pas un obstacle ou un joueur
        if($.inArray(namePosition, this.obstacles) == -1 && namePosition !== this.players[0].name && namePosition !== this.players[1].name) {
            // Définition le périmètre de déplacements possibles
            if (currentPositionY !== upBlock && currentPositionY !== downBlock && currentPositionX !== leftBlock && currentPositionX !== rightBlock) {
                // Réduction du périmètre par rapport de la déstination choisi
                if (currentPositionX == previousPositionX || currentPositionY == previousPositionY) {
                    //  Intérdiction de se déplacer en arrière
                    if (currentPosition == previousPosition) {
                        console.log("ERROR: Impossible to go on previous position");
                    } else {
                        //effacer la position d'avant
                        this.generatedMap[previousPositionY][previousPositionX] = 0; 
                        this.players[nbPlayer].y = currentPositionY;
                        this.players[nbPlayer].x = currentPositionX;
                        this.players[nbPlayer].previousPosition = parseInt(playerPositionY)+""+parseInt(playerPositionX);
                        let player = this.players[nbPlayer];
                        let previousWeapon;
                        // Si la case avec une arme
                        if($.inArray(namePosition, this.weapons) !== -1) {    
                            previousWeapon = this.players[nbPlayer].weapon;
                            this.players[nbPlayer].weapon = namePosition; 
                            console.log("Case weapon: "+ '['+namePosition+']');    
                            listPositions.push(this.players[nbPlayer].weapon, previousWeapon);
                            this.generatedMap[previousPositionY][previousPositionX] = this.players[nbPlayer].weapon;
                            this.updateWeapon(listPositions); 
                        }
                        //listPositions.push(this.players[0].weapon, previousWeapon);
                        this.updateMap(listPositions, player);
                    }
                } else {
                    console.log("ERROR: Impossible to turn from current direction");
                }
            } else {
                console.log("ERROR: Impossible to go more than 3 steps forward");
            }
        } else {    
            console.log("Case obstacle: "+ '['+namePosition+']')
        }
        if(namePosition == this.players[1].name) {
            console.log("Case player: "+ '['+namePosition+']')
        }
    }

    // Check position avant modifier la carte
    makeStep(action, playerPositionX, playerPositionY, startPosition, previousPosition,nbPlayer) {
        switch(action) {
            case "ArrowUp":
                if(playerPositionY -1 >= 0) {
                    this.checkPosition("ArrowUp", playerPositionX, playerPositionY, startPosition, previousPosition,nbPlayer);
                } else {
                    console.log("ERROR: Can't go outside the top border")
                }
            break;
            case "ArrowDown":
                if(playerPositionY+1 < this.y) {
                    this.checkPosition("ArrowDown", playerPositionX, playerPositionY, startPosition, previousPosition,nbPlayer);
                } else {
                    console.log("ERROR: Can't go outside the bottom border")
                }
            break;
            case "ArrowLeft":
                if(playerPositionX-1 >= 0) {
                    this.checkPosition("ArrowLeft", playerPositionX, playerPositionY, startPosition, previousPosition,nbPlayer);
                } else {
                    console.log("ERROR: Can't go outside the left border")
                }
            break;
            case "ArrowRight":
                console.log('arrow right');
                if(playerPositionX+1 < this.x) {
                    this.checkPosition("ArrowRight", playerPositionX, playerPositionY, startPosition, previousPosition,nbPlayer);
                } else {
                    console.log("ERROR: Can't go outside the right border")
                }
            break;
        }
    }
    //Update map ajax
    updateMap(listPositions, player) {
        console.log(listPositions)
        console.log(this.generatedMap)
        let previousPosition = listPositions[0][0]+""+listPositions[0][1],
            currenPosition = listPositions[1][0]+""+listPositions[1][1],
            currentWeapon = listPositions[3],
            previousWeapon = listPositions[4];
        // console.log("Current weapon: "+currentWeapon);
        // console.log("Previous weapon: "+previousWeapon);
        $.ajax({
            success: function(){
                console.log('hey :'+player.name)
                $("#case-"+currenPosition).addClass("case__"+player.name);
                $("#case-"+previousPosition).removeClass("case__"+player.name);
        }});
    }

    updateWeapon(listPositions) {
        console.log(listPositions)
        let previousPosition = listPositions[0][0]+""+listPositions[0][1],
            currenPosition = listPositions[1][0]+""+listPositions[1][1],
            currentPositionName = listPositions[2],
            currentWeapon = listPositions[3],
            previousWeapon = listPositions[4];
        
        console.log("Current weapon: "+currentWeapon);
        console.log("Previous weapon: "+previousWeapon);
        $.ajax({
            success: function(){
                $("#case-"+currenPosition).removeClass().addClass("case case__"+previousWeapon);
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

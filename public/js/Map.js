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

    //Création de la carte vide avec la largeur et la longeur
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

    //Générer le nombre aléatoire en fonction de paramétre num
    generateRandomNumber(num) {
        let randNumber =  Math.floor((Math.random() * num));
        if (randNumber !== -1) {
            return Math.floor((Math.random() * num));
        }
    }
    
    // Positionnement des joueurs sur la carte
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

    // Positionnement des armes sur la carte
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

    // Positionnement des obstacles sur la carte
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

    // Création de la carte avec les éléments générées
    generateMap() {
        this.createMatrix();
        this.positionPlayer();
        console.log("joueur positionné")
        this.positionWeapon();
        console.log("armes positionné")
        this.positionObstacle();
        console.log("obstacles positionné")
    }

    // Récupèrer la position du joueur et sa direction
    getNextPosition(direction) {
        let currentPosition = [this.activePlayer.y, this.activePlayer.x],
            nextPosition = [this.activePlayer.y, this.activePlayer.x],
            nextCaseName;
        switch(direction) {
            case "ArrowUp":
                nextPosition[0] = this.activePlayer.y-1;
                nextCaseName = this.generatedMap[nextPosition[0]][this.activePlayer.x];
                break;
            case "ArrowDown":
                nextPosition[0] = this.activePlayer.y+1;
                nextCaseName = this.generatedMap[nextPosition[0]][this.activePlayer.x]
                break;
            case "ArrowLeft":
                nextPosition[1] = this.activePlayer.x-1;
                nextCaseName = this.generatedMap[this.activePlayer.y][nextPosition[1]];
                break;
            case "ArrowRight":
                nextPosition[1] = this.activePlayer.x+1;
                nextCaseName = this.generatedMap[this.activePlayer.y][nextPosition[1]];
                break;
        }
        return [currentPosition, nextPosition, nextCaseName];
    }

    //Update position of player and delete previous position if not weapon
    updatePosition(nextPositionY, nextPositionX) {
        //effacer la position d'avant
        if (this.activePlayer.previousWeapon) {
            this.generatedMap[this.activePlayer.y][this.activePlayer.x] =  this.activePlayer.previousWeapon;
            this.activePlayer.previousWeapon = null;
        } else {
            this.generatedMap[this.activePlayer.y][this.activePlayer.x] = 0; 
        }
        this.generatedMap[nextPositionY][nextPositionX] = this.activePlayer.name;    
        this.activePlayer.previousPosition = parseInt(this.activePlayer.y)+""+parseInt(this.activePlayer.x);
        this.activePlayer.y = nextPositionY;
        this.activePlayer.x = nextPositionX;
    }

    //Update weapon if case is weapon
    updateWeapon(nameNextPosition, nextPositionInfos) {
        let weaponsLength = this.weapons.length;
        for (let i = 0 ; i< weaponsLength; i++) {
            if (nameNextPosition == this.weapons[i].weapon) {   
                this.activePlayer.previousWeapon = this.activePlayer.weapon.weapon;
                this.activePlayer.weapon =  this.weapons[i]; 
                console.log("Case weapon: "+ '['+nameNextPosition+']');    
                nextPositionInfos.push(this.activePlayer.weapon, this.activePlayer.previousWeapon);
                this.updateVisualWeaponOnMap(nextPositionInfos); 
            }
        }     
    }

    //Verification de la case si weapon ou obstacle
    checkPosition(direction, startPosition) {
        $(".case__can_go").removeClass('case__can_go');
        let previousPosition =  this.activePlayer.previousPosition;
        let nextPositionInfos = this.getNextPosition(direction, this.activePlayer.x, this.activePlayer.y);
        let nameNextPosition =  nextPositionInfos[2],             
            nextPositionY = nextPositionInfos[1][0],
            nextPositionX = nextPositionInfos[1][1];
        let startPositionY =  startPosition[0],
            startPositionX = startPosition[1];
        let possiblesBlocks = this.possiblesWays(startPositionY, startPositionX);
        let  nextPosition = parseInt(nextPositionY)+""+parseInt(nextPositionX);
        let playerCurrentPosition = this.activePlayer.y + "" + this.activePlayer.x;
        // Logs positions
        console.log("Start position: " + "["+startPositionY+"]");
        console.log("New Position: "+ "["+nextPosition+"]");
        console.log("Previous Position: " +"["+previousPosition+"]");
        console.log("CURRENT Position: " +"["+playerCurrentPosition+"]");
        console.log('POSSIBLE BLOCK' +possiblesBlocks.down['block3'])
        // Vérification si la case n'est pas un obstacle ou un joueur
        if ($.inArray(nameNextPosition, this.obstacles) == -1 && this.onFight !== true) {   
            if (playerCurrentPosition !== possiblesBlocks.down['block3'] && playerCurrentPosition !== possiblesBlocks.up['block3']  && playerCurrentPosition !== possiblesBlocks.left['block3']  && playerCurrentPosition !== possiblesBlocks.right['block3'] ) {
                this.showWaysToGo(startPositionY, startPositionX, direction)
                // Réduction du périmètre par rapport de la déstination choisi
                if (nextPositionX == startPositionX || nextPositionY == startPositionY) {
                    //  Intérdiction de se déplacer en arrière
                    if (nextPosition == previousPosition) {
                        console.error("ERROR: Impossible to go on previous position");
                    } else {
                        // Si la case avec une arme
                        this.updatePosition(nextPositionY, nextPositionX);
                        this.updateWeapon(nameNextPosition, nextPositionInfos);
                        this.updateVisualMap(nextPositionInfos, this.activePlayer);
                    }
                } else {
                    console.error("ERROR: Impossible to turn from current direction");
                }
            } else {
                console.error("ERROR: Impossible to go more than 3 steps forward");
            }
        } else {    
            console.log("Case obstacle: "+ '['+nameNextPosition+']')
        }
        this.checkIfPlayerAdjecent(nextPositionY, nextPositionX, nameNextPosition);
    }

    possiblesWays(startPositionY, startPositionX) {
        let stopGoDown = false;
        let stopGoUp = false;
        let stopGoLeft = false;
        let stopGoRight = false;
        let possiblesWays = {down: [], up: [], left: [], right: [] };
  
        for(let n = 1; n< 4; n++) {
            if(startPositionY+n < this.y) {
                if($.inArray(this.generatedMap[startPositionY+n][startPositionX], this.obstacles) == -1 && stopGoDown == false) {
                    possiblesWays.down['block'+n] = parseInt(startPositionY+n) + '' +parseInt((startPositionX));
                }  else {
                    stopGoDown = true;
                }
            } else {
                stopGoDown = true;
            }
            
            if(startPositionY-n  >= 0) {
                if($.inArray(this.generatedMap[startPositionY-n][startPositionX], this.obstacles) == -1 && stopGoUp == false) {
                    possiblesWays.up['block'+n] = parseInt((startPositionY-n)) + '' +parseInt((startPositionX));
                }  else {
                    stopGoUp = true;
                }
            } else {
                stopGoUp = true;
            }

            if(startPositionX-n >= 0) {
                if($.inArray(this.generatedMap[startPositionY][startPositionX-n], this.obstacles) == -1 && stopGoLeft == false) {
                    possiblesWays.left['block'+n] = parseInt((startPositionY)) + '' +parseInt((startPositionX-n));
                }  else {
                    stopGoLeft = true;
                }
            } else {
                stopGoLeft = true;
            }

            if(startPositionX+n < this.x) {
                if($.inArray(this.generatedMap[startPositionY][startPositionX+n], this.obstacles) == -1 && stopGoRight == false) {
                    possiblesWays.right['block'+n] = parseInt((startPositionY)) + '' +parseInt((startPositionX+n));
                }  else {
                    stopGoRight = true;
                }
            } else {
                stopGoRight = true;
            }
        }
        console.log(possiblesWays)
        return possiblesWays;
    }

    getOpponent() {
        let opponent = this.activePlayer.name;
        if(opponent === this.players[0].name) {
            opponent = this.players[1].name;
        } else {
            opponent = this.players[0].name;
        }
        return opponent;
    }

    // Method who verify if case adjacent is player
    checkIfPlayerAdjecent(nextPositionY, nextPositionX, nameNextPosition) {
        let topCaseName = () => { return nextPositionY-1 >= 0 ? this.generatedMap[nextPositionY-1][nextPositionX] : false; }; 
        let downCaseName =  () => { return nextPositionY+1 < this.y ? this.generatedMap[nextPositionY+1][nextPositionX] : false; }; 
        let leftCaseName = () => { return nextPositionX-1 >= 0 ? this.generatedMap[nextPositionY][nextPositionX-1] : false; }; 
        let rightCaseName = () => { return nextPositionX+1 <  this.y ? this.generatedMap[nextPositionY][nextPositionX+1] : false; }; 
        let opponent = this.getOpponent();

        if (topCaseName() === opponent || downCaseName() === opponent || leftCaseName() === opponent || rightCaseName() === opponent) {
            this.onFight = true;
            console.log("Opponent: "+ '['+nameNextPosition+']');
        }
        console.log("Combat: "+ this.onFight);
    }

    switchPlayer() {
        if (this.activePlayer === this.players[0]) {
            this.activePlayer = this.players[1];
        } else {
            this.activePlayer = this.players[0];
        }
    }

    toFight() {
        if (this.activePlayer === this.players[0]) {
            this.activePlayer.toAttack(this.players[1]);
        } else {
            this.activePlayer.toAttack(this.players[0]);
        }
    }

    toBlockTheAttack() {
        this.activePlayer.toBlockTheAttack();
    }

    // Check position avant modifier la carte
    makeStep(direction, startPosition) {
        switch(direction) {
            case "ArrowUp":
                if (this.activePlayer.y -1 >= 0) {
                    this.checkPosition("ArrowUp", startPosition);
                } else {
                    console.error("ERROR: Can't go outside the top border")
                }
            break;
            case "ArrowDown":
                if (this.activePlayer.y +1 < this.y) {
                    this.checkPosition("ArrowDown", startPosition);
                } else {
                    console.error("ERROR: Can't go outside the bottom border")
                }
            break;
            case "ArrowLeft":
                if (this.activePlayer.x -1 >= 0) {
                    this.checkPosition("ArrowLeft", startPosition);
                } else {
                    console.error("ERROR: Can't go outside the left border")
                }
            break;
            case "ArrowRight":
                if (this.activePlayer.x +1 < this.x) {
                    this.checkPosition("ArrowRight", startPosition);
                } else {
                    console.error("ERROR: Can't go outside the right border")
                }
            break;
        }
    }

    //Update map ajax
    updateVisualMap(nextPositionInfos) {
        let playerName = this.activePlayer.name;
        let previousPosition = nextPositionInfos[0][0]+""+nextPositionInfos[0][1],
            nextPosition = nextPositionInfos[1][0]+""+nextPositionInfos[1][1];
        $.ajax({
            success: function(){
                $("#case-"+nextPosition).addClass("case__"+playerName);
                $("#case-"+previousPosition).removeClass("case__"+playerName);
        }});
    }

    // Update weapon
    updateVisualWeaponOnMap(nextPositionInfos) {
        let nextPosition = nextPositionInfos[1][0]+""+nextPositionInfos[1][1],
            currentWeapon = nextPositionInfos[3].weapon,
            previousWeapon = nextPositionInfos[4];
        console.log("Current weapon: "+'['+currentWeapon+']');
        console.log("Previous weapon: "+'['+previousWeapon+']');
        $.ajax({
            success: function(){
                $("#case-"+nextPosition).removeClass().addClass("case case__"+previousWeapon);
        }});
    }

    createRowOnGrid(container, numberRow) {
        let rowX = $('<div id="row-'+[numberRow]+ '"' + 'class="map-grid__row"></div>');
        for (let n = 0; n < this.generatedMap[numberRow].length; n++) {
            // Creation cases
            let caseDiv = $("<div></div>");
                caseDiv.addClass("case");
                caseDiv.attr('id', "case-"+[numberRow]+[n]);
                caseDiv.text(this.generatedMap[numberRow][n]);
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

    lightUpTheWay(possiblesWays) {  
        for (var key in  possiblesWays) {
            console.log("down " + key + " has value " +  possiblesWays[key]);
            $("#case-"+(possiblesWays[key])).addClass("case__can_go");
        }
    }

    // Colored blocks where the player can go
    showWaysToGo(startPositionY, startPositionX, direction=null) {
        let possiblesWays = this.possiblesWays(startPositionY, startPositionX)
        // direction = "Down";
        if(direction == null) {
            this.lightUpTheWay(possiblesWays.down);
            this.lightUpTheWay(possiblesWays.up);
            this.lightUpTheWay(possiblesWays.left);
            this.lightUpTheWay(possiblesWays.right);
        } else if(direction==="ArrowDown") {
            this.lightUpTheWay(possiblesWays.down);
        }
    }

    //Visualiser la carte dans le DOM
    visualizeMap() {
        // Creation field for cases
        let container = $(".map-grid");
        for (let i = 0; i < this.generatedMap.length; i++) {
            this.createRowOnGrid(container, i);
        }
    }
}

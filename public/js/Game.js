import Player from './Player.js';
import Weapon from './Weapon.js';
import Fight from './Fight.js';
import Map from './Map.js';

export default class Game {
    constructor() {
        this.activePlayer;
        this.players = [];
        this.listWeapons = [];
        this.obstacles = [
            "obstacle_one",
            "obstacle_two",
            "obstacle_three",
            "obstacle_four"
        ];
        this.weapons = ["Crowbar", "Gun", "Ak-47", "Gatling"];
        this.map = new Map(10, 10, this.obstacles, this.listWeapons, this.players[0], this.players);
        this.onFight = false;
        this.fight = new Fight();
    }

    initWeapon() {
        for(let i = 0; i < this.weapons.length; i++) {
            let dommageIndex=i+1+'0';
            let weapon = new Weapon("weapon_"+[i], parseInt(dommageIndex), this.weapons[i]);
            this.listWeapons.push(weapon);
        }
    }

    initPlayer() {
        let lengthPlayers = 2;
        for(let i = 0; i<lengthPlayers; i++) {
            let player = new Player("player_"+[i]);
            player.weapon.weapon = this.listWeapons[0].weapon;
            player.weapon.dommage = this.listWeapons[0].dommage;
            player.weapon.name = this.listWeapons[0].nameWeapon;
            this.players.push(player);
        }
        this.activePlayer = this.players[0];
    }

    initMap() {
        this.map.generateMap();
        this.map.visualizeMap();
        this.activePlayer.startPosition = [this.activePlayer.y, this.activePlayer.x];
        this.activePlayer.updateWeaponPlayerInfo();
        this.activePlayer.updateHealthPlayerInfo(this.activePlayer);
        this.activePlayer.updateSectionColorPlayer();
        this.players[1].updateWeaponPlayerInfo();
        this.players[1].updateHealthPlayerInfo(this.players[1]);
        let possiblesWays = this.possiblesWays(this.activePlayer.y, this.activePlayer.x, this.activePlayer, this.getOpponent());
        this.activePlayer.showWaysToGo(possiblesWays);
    }

    getOpponent() {
        if(this.activePlayer.name === this.players[0].name) {
            return this.players[1].name;
        } else {
            return this.players[0].name;
        }
    }

    switchPlayer() {
        if (this.activePlayer === this.players[0]) {
            this.activePlayer = this.players[1];
            this.activePlayer.updateSectionColorPlayer(this.players[0].name);
        } else {
            this.activePlayer = this.players[0];
            this.activePlayer.updateSectionColorPlayer(this.players[1].name);
        }
    }

    turnPlayer() {
        let that = this;
        $( "#turn").on("click", function() {
            $(".case__can_go").removeClass('case__can_go');
            that.switchPlayer();
            that.activePlayer.newTurn();
            let possiblesWays = that.possiblesWays(that.activePlayer.y, that.activePlayer.x, that.activePlayer, that.getOpponent());
            that.activePlayer.showWaysToGo(possiblesWays);
        });
    }

    toAttack() {
        let that = this;
        $( "#attack").on("click", function() {
            console.log("Fight");
            if (that.activePlayer === that.players[0]) {
                that.fight.toAttack(that.players[1], that.activePlayer.weapon.dommage);
            } else {
                that.fight.toAttack(that.players[0], that.activePlayer.weapon.dommage);
            }
            that.switchPlayer();
        });
    }

    toDefend() {
        let that = this;
        $("#to-defend").on("click", function() {
            that.fight.toBlockTheAttack(that.activePlayer);
            that.switchPlayer();
        });
    }

    modeFight() {
        this.fight.hideTurnButton();
        this.fight.showAttackButton();
        this.fight.showShieldButton();
        this.activePlayer.removeLightUpTheWay();
    }

    movement() {
        document.addEventListener('keydown', (e) => {
            console.log(this.activePlayer)
            this.makeStep(e.key, this.activePlayer, this.getOpponent());
            if(this.players[0].onFight == true && this.players[1].onFight == true) {
                this.modeFight();
            }
            if (!e.repeat) {
                console.log(`Key "${e.key}" pressed  [event: keydown]`);
            } else {
                console.log(`Key "${e.key}" repeating  [event: keydown]`);
            }
        });
    }

    //Verification de la case si weapon ou obstacle
    checkPosition(direction) {
        let startPosition = this.activePlayer.startPosition;    
        let previousPosition =  this.activePlayer.previousPosition;
        let nextPositionInfos = this.getNextPosition(direction, this.activePlayer.x, this.activePlayer.y);
        let nameNextPosition =  nextPositionInfos[2],             
            nextPositionY = nextPositionInfos[1][0],
            nextPositionX = nextPositionInfos[1][1];
        let startPositionY =  startPosition[0],
            startPositionX = startPosition[1];
        let  nextPosition = parseInt(nextPositionY)+""+parseInt(nextPositionX);
        let playerCurrentPosition = this.activePlayer.y + "" + this.activePlayer.x;
        let opponent = this.getOpponent();
        let possiblesBlocks = this.possiblesWays(startPositionY, startPositionX);

        // Logs positions
        console.log("Start position: " + "["+startPositionY+"]");
        console.log("New Position: "+ "["+nextPosition+"]");
        console.log("Previous Position: " +"["+previousPosition+"]");
        console.log("Current Position: " +"["+playerCurrentPosition+"]");
        console.log("Previous mouvement: "+this.activePlayer.previousMouvement);
        // Vérification si la case n'est pas un obstacle ou un joueur
        if ($.inArray(nameNextPosition, this.obstacles) == -1) {
            if (possiblesBlocks.down.includes(nextPosition) || possiblesBlocks.up.includes(nextPosition) || possiblesBlocks.left.includes(nextPosition) || possiblesBlocks.right.includes(nextPosition)) {
                //Update the position, weapons and ways possibles
                this.updatePosition(nextPositionY, nextPositionX, this.activePlayer);
                this.updateWeapon(nameNextPosition, nextPositionInfos, this.activePlayer);
                this.activePlayer.updatePlayerPosition(nextPositionInfos);
                this.activePlayer.showWaysToGo(possiblesBlocks, direction);
            } else {
                console.error("ERROR: Impossible to go to this position");
            }
            // Check if adjacent block is opponent
            this.checkIfPlayerAdjecent(this.activePlayer.y, this.activePlayer.x, nameNextPosition, opponent, this.activePlayer);
        } else {    
            console.log("Case obstacle: "+ '['+nameNextPosition+']');
        }
    }

    // Get possibles blocks to go
    possiblesWays(startPositionY, startPositionX) {
        let stopGoDown = false;
        let stopGoUp = false;
        let stopGoLeft = false;
        let stopGoRight = false;
        let possiblesWays = {down: [], up: [], left: [], right: [] };
        let oppenent = this.getOpponent();
        for(let n = 1; n < 4; n++) {
            if(startPositionY+n < this.map.y) {
                if($.inArray(this.map.generatedMap[startPositionY+n][startPositionX], this.obstacles) == -1 && this.map.generatedMap[startPositionY+n][startPositionX] !== oppenent && stopGoDown == false) {
                    if(!this.activePlayer.previousMouvement.includes(parseInt(startPositionY+n) + '' +parseInt((startPositionX)))) {
                        possiblesWays.down.push(parseInt(startPositionY+n) + '' +parseInt((startPositionX)));
                    }
                }  else {
                    stopGoDown = true;
                }
            } else {
                stopGoDown = true;
            }
            
            if(startPositionY-n  >= 0) {
                if($.inArray(this.map.generatedMap[startPositionY-n][startPositionX], this.obstacles) == -1 && this.map.generatedMap[startPositionY-n][startPositionX] !== oppenent && stopGoUp == false) {
                    if(!this.activePlayer.previousMouvement.includes( parseInt(startPositionY-n) + '' +parseInt((startPositionX)))) {
                        possiblesWays.up.push(parseInt((startPositionY-n)) + '' +parseInt((startPositionX)));
                    }
                }  else {
                    stopGoUp = true;
                }
            } else {
                stopGoUp = true;
            }

            if(startPositionX-n >= 0) {
                if($.inArray(this.map.generatedMap[startPositionY][startPositionX-n], this.obstacles) == -1 && this.map.generatedMap[startPositionY][startPositionX-n] !== oppenent &&  stopGoLeft == false) {
                    if(!this.activePlayer.previousMouvement.includes( parseInt(startPositionY) + '' +parseInt((startPositionX-n)))) {
                        possiblesWays.left.push(parseInt((startPositionY)) + '' +parseInt((startPositionX-n)));
                    }
                }  else {
                    stopGoLeft = true;
                }
            } else {
                stopGoLeft = true;
            }

            if(startPositionX+n < this.map.x) {
                if($.inArray(this.map.generatedMap[startPositionY][startPositionX+n], this.obstacles) == -1 && this.map.generatedMap[startPositionY][startPositionX+n] !== oppenent && stopGoRight == false) {
                    if(!this.activePlayer.previousMouvement.includes( parseInt(startPositionY) + '' +parseInt((startPositionX+n)))) {
                        possiblesWays.right.push( parseInt((startPositionY)) + '' +parseInt((startPositionX+n)));
                    }
                }  else {
                    stopGoRight = true;
                }
            } else {
                stopGoRight = true;
            }
        }
        return possiblesWays;
    }

    // Check position after to modify the map
    makeStep(direction) {
        switch(direction) {
            case "ArrowUp":
                if (this.activePlayer.y -1 >= 0) {
                    if(this.activePlayer.onFight == false) {
                        this.checkPosition("ArrowUp");
                    }
                } else {
                    console.error("ERROR: Can't go outside the top border")
                }
            break;
            case "ArrowDown":
                if (this.activePlayer.y +1 < this.map.y) {
                    if(this.activePlayer.onFight == false) {
                    this.checkPosition("ArrowDown");
                    }
                } else {
                    console.error("ERROR: Can't go outside the bottom border")
                }
            break;
            case "ArrowLeft":
                if (this.activePlayer.x -1 >= 0) {
                    if(this.activePlayer.onFight == false) {
                    this.checkPosition("ArrowLeft");
                    }
                } else {
                    console.error("ERROR: Can't go outside the left border")
                }
            break;
            case "ArrowRight":
                if (this.activePlayer.x +1 < this.map.x) {
                    if(this.activePlayer.onFight == false) {
                    this.checkPosition("ArrowRight");
                    }
                } else {
                    console.error("ERROR: Can't go outside the right border")
                }
            break;
        }
    }

    // Method who verify if case adjacent is player
    checkIfPlayerAdjecent(nextPositionY, nextPositionX, nameNextPosition) {
        let opponent = this.getOpponent();
        let topCaseName = () => { return nextPositionY-1 >= 0 ? this.map.generatedMap[nextPositionY-1][nextPositionX] : false; }; 
        let downCaseName =  () => { return nextPositionY+1 < this.map.y ? this.map.generatedMap[nextPositionY+1][nextPositionX] : false; }; 
        let leftCaseName = () => { return nextPositionX-1 >= 0 ? this.map.generatedMap[nextPositionY][nextPositionX-1] : false; }; 
        let rightCaseName = () => { return nextPositionX+1 <  this.map.y ? this.map.generatedMap[nextPositionY][nextPositionX+1] : false; }; 

        if (topCaseName() === opponent || downCaseName() === opponent || leftCaseName() === opponent || rightCaseName() === opponent) {
            this.players[0].onFight = true;
            this.players[1].onFight = true;
            console.log("Opponent: "+ '['+nameNextPosition+']');
        }
        console.log("Combat: "+ this.activePlayer.onFight);
    }

    //Update position of player and delete previous position if not weapon
    updatePosition(nextPositionY, nextPositionX) {
        //Erase the previous position
        if (this.activePlayer.previousWeapon) {
            this.map.generatedMap[this.activePlayer.y][this.activePlayer.x] =  this.activePlayer.previousWeapon;
            this.activePlayer.previousWeapon = null;
        } else {
            this.map.generatedMap[this.activePlayer.y][this.activePlayer.x] = 0; 
        }
        this.map.generatedMap[nextPositionY][nextPositionX] = this.activePlayer.name;    
        this.activePlayer.previousPosition = parseInt(this.activePlayer.y)+""+parseInt(this.activePlayer.x);
        this.activePlayer.y = nextPositionY;
        this.activePlayer.x = nextPositionX;
        this.activePlayer.previousMouvement.push(parseInt(this.activePlayer.y)+""+parseInt(this.activePlayer.x));
    }

    getNextPosition(direction, playerPositionX, playerPositionY) {
        let currentPosition = [playerPositionY, playerPositionX],
            nextPosition = [playerPositionY, playerPositionX, playerPositionX],
            nextCaseName;
        switch(direction) {
            case "ArrowUp":
                nextPosition[0] = playerPositionY-1;
                nextCaseName = this.map.generatedMap[nextPosition[0]][playerPositionX];
                break;
            case "ArrowDown":
                nextPosition[0] = playerPositionY+1;
                nextCaseName = this.map.generatedMap[nextPosition[0]][playerPositionX]
                break;
            case "ArrowLeft":
                nextPosition[1] = playerPositionX-1;
                nextCaseName = this.map.generatedMap[playerPositionY][nextPosition[1]];
                break;
            case "ArrowRight":
                nextPosition[1] = playerPositionX+1;
                nextCaseName = this.map.generatedMap[playerPositionY][nextPosition[1]];
                break;
        }
        return [currentPosition, nextPosition, nextCaseName];
    }

    //Update weapon if case is weapon
    updateWeapon(nameNextPosition, nextPositionInfos) {
        let weaponsLength = this.weapons.length;
        for (let i = 0 ; i< weaponsLength; i++) {
            if (nameNextPosition == this.listWeapons[i].weapon) {   
                this.activePlayer.previousWeapon = this.activePlayer.weapon.weapon;
                this.activePlayer.weapon.weapon =  this.listWeapons[i].weapon; 
                this.activePlayer.weapon.name =  this.listWeapons[i].nameWeapon; 
                console.log("Case weapon: "+ '['+nameNextPosition+']');    
                nextPositionInfos.push(this.activePlayer.weapon, this.activePlayer.previousWeapon);
                this.updateVisualWeaponOnMap(nextPositionInfos); 
                this.activePlayer.updateWeaponPlayerInfo();
            }
        }     
    }

    updateVisualWeaponOnMap(nextPositionInfos) {
        let nextPosition = nextPositionInfos[1][0]+""+nextPositionInfos[1][1],
            currentWeapon = nextPositionInfos[3].weapon,
            previousWeapon = nextPositionInfos[4];
        console.log("Current weapon: "+'['+currentWeapon+']');
        console.log("Previous weapon: "+'['+previousWeapon+']');
        $.ajax({
            success: function(){
                $("#case-"+nextPosition).removeClass("case case__"+currentWeapon).addClass("case case__"+previousWeapon);    
        }});
    }

    initGame() {
        this.initWeapon();
        this.initPlayer();
        this.initMap();
        this.movement();
        this.turnPlayer();
        this.toAttack();
        this.toDefend();
    }
}
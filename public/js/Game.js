import Player from './Player.js';
import Weapon from './Weapon.js';
import Fight from './Fight.js';
import Map from './Map.js';
import { obstacles, weapons } from './utils/variables.js';

export default class Game {
    constructor(mapHeight, mapWidth) {
        this.activePlayer;
        this.players = [];
        this.listWeapons = [];
        this.map = new Map(mapHeight, mapWidth, obstacles, this.listWeapons, this.players[0], this.players);
        this.fight = new Fight();
        this.initWeapon();
        this.initPlayer();
        this.initMap();
        this.movement();
        this.turnPlayer();
        this.toAttack();
        this.toDefend();
    }

    initWeapon() {
        for(let i = 0; i < weapons.length; i++) {
            let dommageIndex=i+1+'0';
            let weapon = new Weapon("weapon_"+[i], parseInt(dommageIndex), weapons[i]);
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
        let opponent = this.getOpponent();
        this.activePlayer.startPosition = [this.activePlayer.y, this.activePlayer.x];
        this.activePlayer.updateSectionColorPlayer(opponent.name);
        let possiblesWays = this.possiblesWays(this.activePlayer.y, this.activePlayer.x, this.activePlayer, this.getOpponent());
        this.activePlayer.showWaysToGo(possiblesWays);
        this.initplayersStartInfos();
    }

    initplayersStartInfos() {
        for(let i = 0; i<this.players.length; i++) {
            this.players[i].updateWeaponPlayerInfo();
            this.players[i].updateHealthPlayerInfo(this.players[i]);
        }
    }

    getOpponent() {
        return this.activePlayer.name === this.players[0].name ? this.players[1] : this.players[0];
    }

    switchPlayer() {    
        this.activePlayer === this.players[0] ? this.activePlayer = this.players[1]: this.activePlayer = this.players[0];
        let opponent = this.getOpponent(this.activePlayer);
        this.activePlayer.updateSectionColorPlayer(opponent.name);
    }

    turnPlayer() {
        $( "#turn").on("click", () => {
            $(".case__can_go").removeClass('case__can_go');
            this.switchPlayer();
            this.activePlayer.newTurn();
            let possiblesWays = this.possiblesWays(this.activePlayer.y, this.activePlayer.x, this.activePlayer, this.getOpponent());
            this.activePlayer.showWaysToGo(possiblesWays);
        });
    }

    toAttack() {
        $( "#attack").on("click", () => {
            let opponent = this.getOpponent();
            this.fight.toAttack(opponent, this.activePlayer.weapon.dommage);
            this.switchPlayer();
        });
    }

    toDefend() {
        $("#to-defend").on("click", () => {
            this.fight.toBlockTheAttack(this.activePlayer);
            this.switchPlayer();
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
            this.makeStep(e.key);
            this.players[0].onFight == true && this.players[1].onFight == true ? this.modeFight() : false;
        });
    }

    // Checking the box if weapon or obstacle 
    checkPosition(direction) {
        let startPosition = this.activePlayer.startPosition;    
        let nextPositionInfos = this.getNextPosition(direction, this.activePlayer.x, this.activePlayer.y);
        let nameNextPosition =  nextPositionInfos[2],             
            nextPositionY = nextPositionInfos[1][0],
            nextPositionX = nextPositionInfos[1][1];
        let startPositionY =  startPosition[0],
            startPositionX = startPosition[1];
        let  nextPosition = parseInt(nextPositionY)+""+parseInt(nextPositionX);
        let opponent = this.getOpponent();
        let possiblesBlocks = this.possiblesWays(startPositionY, startPositionX);

        // Checking if the square is not an obstacle or a player
        if ($.inArray(nameNextPosition, obstacles) == -1) {
            if (possiblesBlocks.down.includes(nextPosition) || possiblesBlocks.up.includes(nextPosition) || possiblesBlocks.left.includes(nextPosition) || possiblesBlocks.right.includes(nextPosition)) {
                //Update the position, weapons and ways possibles
                this.updatePosition(nextPositionY, nextPositionX, this.activePlayer);
                this.updateWeapon(nameNextPosition, nextPositionInfos, this.activePlayer);
                this.activePlayer.updatePlayerPosition(nextPositionInfos, direction);
                let possiblesWays = this.possiblesWays(startPositionY, startPositionX);
                this.activePlayer.showWaysToGo(possiblesWays, direction);
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
                if($.inArray(this.map.generatedMap[startPositionY+n][startPositionX], obstacles) == -1 && this.map.generatedMap[startPositionY+n][startPositionX] !== oppenent && stopGoDown == false) {
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
                if($.inArray(this.map.generatedMap[startPositionY-n][startPositionX], obstacles) == -1 && this.map.generatedMap[startPositionY-n][startPositionX] !== oppenent && stopGoUp == false) {
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
                if($.inArray(this.map.generatedMap[startPositionY][startPositionX-n], obstacles) == -1 && this.map.generatedMap[startPositionY][startPositionX-n] !== oppenent &&  stopGoLeft == false) {
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
                if($.inArray(this.map.generatedMap[startPositionY][startPositionX+n], obstacles) == -1 && this.map.generatedMap[startPositionY][startPositionX+n] !== oppenent && stopGoRight == false) {
                    if(!this.activePlayer.previousMouvement.includes( parseInt(startPositionY) + '' +parseInt((startPositionX+n)))) {
                        possiblesWays.right.push(parseInt((startPositionY)) + '' +parseInt((startPositionX+n)));
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

    // Check position before to modify the map
    makeStep(direction) {
        if(this.activePlayer.onFight == false) {
            switch(direction) {
                case "ArrowUp":
                    this.activePlayer.y -1 >= 0 ? this.checkPosition("ArrowUp") : console.error("ERROR: Can't go outside the top border");
                break;
                case "ArrowDown":
                    this.activePlayer.y +1 < this.map.y ?  this.checkPosition("ArrowDown") : console.error("ERROR: Can't go outside the bottom border")
                break;
                case "ArrowLeft":
                    this.activePlayer.x -1 >= 0 ? this.checkPosition("ArrowLeft") : console.error("ERROR: Can't go outside the left border");
                break;
                case "ArrowRight":
                    this.activePlayer.x +1 < this.map.x ? this.checkPosition("ArrowRight") :  console.error("ERROR: Can't go outside the right border");
                break;
            }
        }
    }

    // Method who verify if case adjacent is player
    checkIfPlayerAdjecent(nextPositionY, nextPositionX, nameNextPosition) {
        let opponent = this.getOpponent();
        let topCaseName = () => { return nextPositionY-1 >= 0 ? this.map.generatedMap[nextPositionY-1][nextPositionX] : false; }; 
        let downCaseName =  () => { return nextPositionY+1 < this.map.y ? this.map.generatedMap[nextPositionY+1][nextPositionX] : false; }; 
        let leftCaseName = () => { return nextPositionX-1 >= 0 ? this.map.generatedMap[nextPositionY][nextPositionX-1] : false; }; 
        let rightCaseName = () => { return nextPositionX+1 <  this.map.y ? this.map.generatedMap[nextPositionY][nextPositionX+1] : false; }; 

        if (topCaseName() === opponent.name || downCaseName() === opponent.name || leftCaseName() === opponent.name || rightCaseName() === opponent.name) {
            this.players[0].onFight = true;
            this.players[1].onFight = true;
        }
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
        let weaponsLength = weapons.length;
        for (let i = 0 ; i< weaponsLength; i++) {
            if (nameNextPosition == this.listWeapons[i].weapon) {   
                this.activePlayer.previousWeapon = this.activePlayer.weapon.weapon;
                this.activePlayer.weapon.weapon =  this.listWeapons[i].weapon; 
                this.activePlayer.weapon.name =  this.listWeapons[i].nameWeapon; 
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
        $.ajax({
            success: function(){
                $("#case-"+nextPosition).removeClass("case case__"+currentWeapon).addClass("case case__"+previousWeapon);    
        }});
    }
}
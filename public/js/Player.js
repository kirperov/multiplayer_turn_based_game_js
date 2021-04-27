import Fight from './Fight.js';
export default class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.onFight = false;
        this.startPosition = [];
        this.previousPosition;
        this.previousMouvement = [];
        this.previousWeapon;
        this.health = 100;
        this.defense = false;
        this.weapon = {
            weapon: "",
            dommage: "",
            name: ""
        };
    }

    newTurn() {
        this.previousPosition = null;
        this.previousMouvement = [];
        this.startPosition = [this.y, this.x];
    }

    removeLightUpTheWay() {
        $(".case__can_go").removeClass("case__can_go");
    }

    //Update weapon on section info player
    updateWeaponPlayerInfo() {
        let playerWeaponInfoImg = $("#"+this.name+"-weapon-img");
        let playerWeaponInfoValue = $("#"+this.name+"-weapon-value");
        $('#'+playerWeaponInfoImg.attr('id')).removeClass("player-infos__"+this.previousWeapon).addClass("player-infos__"+this.weapon.weapon);
        $('#'+playerWeaponInfoValue.attr('id')).text(this.weapon.name);
    }

    //Update health on section info player
    updateHealthPlayerInfo(playerToAttack) {
        let playerHealthInfoValue = $("#"+playerToAttack.name+"-health-value");
        $.ajax({
            success: function(){
                $('#'+playerHealthInfoValue.attr('id')).text(playerToAttack.health + "%");
        }});
    }

    //Update if shield on section info player
    updatShieldPlayerInfo(playerName=this.name, playerDefense=this.defense) {
        let playerShieldImageInfo = $("#"+playerName+"-shield");
        if(playerDefense) {
            $('#'+playerShieldImageInfo.attr('id')).removeClass("player-infos__shield--hidden").addClass("player-infos__shield--visible");
        } else {
            $('#'+playerShieldImageInfo.attr('id')).removeClass("player-infos__shield--visible").addClass("player-infos__shield--hidden");
        }
    }

    //Update section color of activ player
    updateSectionColorPlayer(opponent) {
        $("#"+opponent).removeClass("player-infos--active");
        $("#"+this.name).addClass("player-infos--active");
    }

    lightUpTheWay(possiblesWays) {  
        for (var key in possiblesWays) {
            $("#case-"+(possiblesWays[key])).addClass("case__can_go");
        }
    }

    rotatePlayer(direction) {
        let rotate;
        console.log(direction)
        switch (direction) {
            case "ArrowUp":
                rotate = "rotate--up";
            break;
            case "ArrowDown":
                rotate = "rotate--down";
            break;
        
            case "ArrowLeft":
                rotate = "rotate--left";
            break;
        
            case "ArrowRight":
                rotate = "rotate--right";
            break;

            default:
                rotate = "rotate--up";
            break;
        } 
        return rotate;
    }

    //Colored blocks where the player can go
    showWaysToGo(possiblesWays, direction=null) {
        $(".case__can_go").removeClass("case__can_go");
        switch (direction) {
            case "ArrowUp":
                 this.lightUpTheWay(possiblesWays.up);
            break;
            case "ArrowDown":
                this.lightUpTheWay(possiblesWays.down);
            break;
        
            case "ArrowLeft":
                this.lightUpTheWay(possiblesWays.left);
            break;
        
            case "ArrowRight":
                this.lightUpTheWay(possiblesWays.right);
            break;

            default:
                this.lightUpTheWay(possiblesWays.up);
                this.lightUpTheWay(possiblesWays.down);
                this.lightUpTheWay(possiblesWays.left);
                this.lightUpTheWay(possiblesWays.right);
            break;
        } 
    }

    updatePlayerPosition(nextPositionInfos, direction) {
        console.log(nextPositionInfos)
        let previousPosition = nextPositionInfos[0][0]+""+nextPositionInfos[0][1],
            nextPosition = nextPositionInfos[1][0]+""+nextPositionInfos[1][1];
        let rotation = this.rotatePlayer(direction);
        $.ajax({
            success: () => {
                $("#case-"+nextPosition).addClass("case__"+this.name);
                $("#case-"+nextPosition).addClass(rotation);
                $("#case-"+previousPosition).removeClass("case__"+this.name);
                $("#case-"+previousPosition).removeClass('rotate--up rotate--down rotate--left rotate--right');
        }});
    }
}
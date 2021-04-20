export default class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
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

    toAttack(playerToAttack) {
        let dommage = this.weapon.dommage;
        if(playerToAttack.health > 0) {
            if(playerToAttack.defense === true) {
                dommage = dommage-(dommage * 50/100);
                playerToAttack.defense = false;
                this.updatShieldPlayerInfo(playerToAttack.name, playerToAttack.defense);
            }
            playerToAttack.health  = playerToAttack.health - dommage;
            this.updateHealthPlayerInfo(playerToAttack);
            this.updateSectionColorPlayer(playerToAttack.name);
        }
    }

    toBlockTheAttack() {
        this.defense = true;
        this.updatShieldPlayerInfo();
    }

    // Update weapon on section info player
    updateWeaponPlayerInfo() {
        let playerWeaponInfoImg = $("#"+this.name+"-weapon-img");
        let playerWeaponInfoValue = $("#"+this.name+"-weapon-value");
        $('#'+playerWeaponInfoImg.attr('id')).removeClass("player-infos__"+this.previousWeapon).addClass("player-infos__"+this.weapon.weapon);
        $('#'+playerWeaponInfoValue.attr('id')).text(this.weapon.name);
    }

    // Update health on section info player
    updateHealthPlayerInfo(playerToAttack) {
        let playerHealthInfoValue = $("#"+playerToAttack.name+"-health-value");
        $.ajax({
            success: function(){
                $('#'+playerHealthInfoValue.attr('id')).text(playerToAttack.health + "%");
        }});
    }

    // Update if shield on section info player
    updatShieldPlayerInfo(playerName=this.name, playerDefense=this.defense) {
        let playerShieldImageInfo = $("#"+playerName+"-shield");
        if(playerDefense) {
            $('#'+playerShieldImageInfo.attr('id')).removeClass("player-infos__shield--hidden").addClass("player-infos__shield--visible");
        } else {
            $('#'+playerShieldImageInfo.attr('id')).removeClass("player-infos__shield--visible").addClass("player-infos__shield--hidden");
        }
    }

    // Update section color of activ player
    updateSectionColorPlayer(playerToAttack) {
        $("#"+playerToAttack).removeClass("player-infos--active");
        $("#"+this.name).addClass("player-infos--active");
    }
}
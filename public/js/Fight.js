export default class Fight {
    toAttack(playerToAttack, damage) {
        if(playerToAttack.health > 0) {
            if(playerToAttack.defense === true) {
                damage = damage-(damage * 50/100);
                playerToAttack.defense = false;
                playerToAttack.updatShieldPlayerInfo(playerToAttack.name, playerToAttack.defense);
            }
            playerToAttack.health  = playerToAttack.health - damage;
            playerToAttack.updateHealthPlayerInfo(playerToAttack);
            playerToAttack.updateSectionColorPlayer(playerToAttack.name);
            if(playerToAttack.health <= 0) {
                return false;
            } 
            return true;
        } 
    }

    toBlockTheAttack(player) {
        player.defense = true;
        player.updatShieldPlayerInfo();
    }

    hideTurnButton() {
        $("#turn").removeClass("btn-turn--active").addClass("btn-turn--hidden");
    }

    showAttackButton() {
        $("#attack").removeClass("btn-attack--hidden").addClass("btn-attack--active");
    }

    showShieldButton() {
        $("#to-defend").removeClass("btn-defend--hidden").addClass("btn-defend--active");
    }

}
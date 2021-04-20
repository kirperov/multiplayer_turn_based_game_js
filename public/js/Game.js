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
        this.map.showWaysToGo(this.map.possiblesWays(this.activePlayer.y, this.activePlayer.x, this.activePlayer, this.getOpponent()))
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
            that.map.showWaysToGo(that.activePlayer.y, that.activePlayer.x, that.activePlayer, that.getOpponent());
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
            this.map.makeStep(e.key, this.activePlayer, this.getOpponent());
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
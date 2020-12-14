export default class Map {
    constructor(x, y, obstacles, players, weapons) {
        this.x = x;
        this.y = y;
        this.obstacles = obstacles;
        this.players = players;
        this.weapons = weapons;
        this.generatedMap = [];
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
    
    genrateObstacles() {
        for(let i = 0; i < this.y; i++) {
            let numberRand = this.generateRandomNumber(this.y * 0.4);
            for(let n = 0; n < numberRand; n++) {
                let positioned = false;
                while(positioned == false) {
                    let obstNbRand = this.generateRandomNumber(this.obstacles.length);
                    let caseNbRand = this.generateRandomNumber(this.y);
                    if(this.generatedMap[i][caseNbRand] == 0) {
                        positioned = true;
                        this.generatedMap[i][caseNbRand] = this.obstacles[obstNbRand];
                    }
                }
            }
        }
    }

    generatePlayers() {
        for(let i = 0; i < this.players.length; i++) {
            let positioned = false;
            while(positioned == false) {
                let nbRandY = this.generateRandomNumber(this.generatedMap.length);   
                let nbRandX = this.generateRandomNumber(this.generatedMap[i].length);   
                if(this.generatedMap[nbRandY][nbRandX] == 0) {
                    let topCase = "ob";
                    let downCase = "ob";
                    let leftCase = "ob";
                    let rightCase = "ob";

                    //Verification top case
                    if(typeof this.generatedMap[nbRandY -1]  !== "undefined") {
                        if(this.generatedMap[nbRandY -1][nbRandX] == this.players[0] || this.generatedMap[nbRandY -1][nbRandX] == this.players[1]) {
                            continue;
                        } else {
                            topCase = this.generatedMap[nbRandY -1][nbRandX];
                        }
                    } 
                    //Verification down case
                     if(typeof this.generatedMap[nbRandY +1] !== "undefined") {
                        if(this.generatedMap[nbRandY +1][nbRandX] == this.players[0] || this.generatedMap[nbRandY +1][nbRandX] == this.players[1]) {
                            continue;
                        } else {
                            downCase = this.generatedMap[nbRandY +1][nbRandX];
                        }
                    } 
                    //Verification left case
                     if(typeof this.generatedMap[nbRandY][nbRandX -1] !== "undefined"){
                        if(this.generatedMap[nbRandY][nbRandX -1] == this.players[0] || this.generatedMap[nbRandY][nbRandX -1] == this.players[1]) {
                            continue;
                        } else {
                            leftCase = this.generatedMap[nbRandY][nbRandX -1];
 
                        }
                    }  
                    //Verification right case
                    if(typeof this.generatedMap[nbRandY][nbRandX +1] !== "undefined") {
                        if(this.generatedMap[nbRandY][nbRandX +1] == this.players[0] || this.generatedMap[nbRandY][nbRandX +1] == this.players[1]) {
                           continue; 
                        } else {
                            rightCase = this.generatedMap[nbRandY][nbRandX +1];
                        }
                    }
                    //Verifiy obstacles
                    if(topCase.toString().includes('ob') && downCase.toString().includes('ob')&& leftCase.toString().includes('ob') && rightCase.toString().includes('ob')) {
                        continue; 
                    } else {
                        this.generatedMap[nbRandY][nbRandX] = this.players[i];
                    }
                    positioned = true;  
                }
            }
        }
    }

    generateWeapons() {
        for(let i = 0; i < weapons.length; i++) {
            let positioned = false;
            while(positioned == false) {
                let nbRandY = this.generateRandomNumber(this.generatedMap.length);   
                let nbRandX = this.generateRandomNumber(this.generatedMap[i].length);
                if(this.generatedMap[nbRandY][nbRandX] == 0) {
                    this.generatedMap[nbRandY][nbRandX] = this.weapons[i];
                    positioned = true;
                }
            }
        }
    }

    generateMap() {
        this.createMatrix(this.x, this.y);
        this.genrateObstacles();
        this.generateWeapons();
        this.generatePlayers();

        let container = $(".map-grid");

        for(let i = 0; i <this.generatedMap.length; i++) {
            let rowX = $("<div></div>");
            rowX.addClass("map-grid__obstacle");
            rowX.attr("id", "obstacle-"+[i]);

            for(let n = 0; n <this.generatedMap[i].length; n++) {
                
                let caseDiv = $("<div></div>");
                caseDiv.addClass("case");
                caseDiv.attr('id', "case-"+[n]);
                caseDiv.text(this.generatedMap[i][n]);
                rowX.append(caseDiv);
                container.append(rowX);
                // Attribution des classes en fonction des cases
                caseDiv.each(function() {
                    if($(this).text() == "0") {
                        $(this).empty();
                        $(this).addClass('case__empty');
                        //obstacle 1
                    } else if($(this).text() == "ob1"){
                        $(this).empty();
                        $(this).addClass('case__obstacle_one');
                        //obstacle 2
                    } else if($(this).text() == "ob2") {
                        $(this).empty();
                        $(this).addClass('case__obstacle_two');
                        //obstacle 3
                    } else if($(this).text() == "ob3") {
                        $(this).empty();
                        $(this).addClass('case__obstacle_three');
                        //obstacle 4
                    } else if($(this).text() == "ob4") {
                        $(this).empty();
                        $(this).addClass('case__obstacle_four');
                    }
                    // WEAPONS
                    //weapon 1
                    if($(this).text() == "w1"){
                        $(this).empty();
                        $(this).addClass('case__weapon_one');
                        //weapon 2
                    } else if($(this).text() == "w2") {
                        $(this).empty();
                        $(this).addClass('case__weapon_two');
                        //weapon 3
                    } else if($(this).text() == "w3") {
                        $(this).empty();
                        $(this).addClass('case__weapon_three');
                        //weapon 4
                    } else if($(this).text() == "w4") {
                        $(this).empty();
                        $(this).addClass('case__weapon_four');
                    } 
                    // PLAYERS
                    if($(this).text() == "p1") {
                        $(this).empty();
                        $(this).addClass('case__player_one');
                        //weapon 4
                    } else if($(this).text() == "p2") {
                        $(this).empty();
                        $(this).addClass('case__player_two');
                    } 
                });
            }
            console.log(this.generatedMap[i]);
        }
    }
}

let obstacles = ["ob1", "ob2", "ob3", "ob4"],
    players = ["p1", "p2"],
    weapons = ["w1", "w2", "w3", "w4"];
let generateMap=new Map(10, 10, obstacles, players, weapons);
generateMap.generateMap();
 
 
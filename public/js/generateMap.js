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
                    if(topCase.toString().includes('ob') && downCase.toString().includes('ob') && leftCase.toString().includes('ob') && rightCase.toString().includes('ob')) {
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
        // Creation field for cases
        let container = $(".map-grid");
        for(let i = 0; i < this.generatedMap.length; i++) {
            let rowX = $('<div id="row-'+[i]+ '"' + 'class="map-grid__row"></div>');
            for(let n = 0; n < this.generatedMap[i].length; n++) {
                // Creation cases
                let caseDiv = $("<div></div>");
                caseDiv.addClass("case");
                caseDiv.attr('id', "case-"+[i]+"-"+[n]);
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

        let iterationX=0;
        let iterationY=0;
        document.addEventListener('keydown', (e) => {
            let playerOne = $(".case__player_one");
            let playerOneId = playerOne.attr("id");
            let x = playerOneId.substring(5,6);
            let y = playerOneId.substring(7,8);
            if(e.key == "ArrowUp") {
                let classX = "case__player_one";
                iterationX=0;
                iterationY=0; 
                iterationX+=1;
                iterationY=iterationX-1;
                $('#case-'+(x-iterationX)+'-'+y).addClass(classX);
                $('#case-'+(x-iterationY)+'-'+y).removeClass(classX);
                // TODO VERIFICATION IS VALID CASE
            } else if(e.key == "ArrowDown") {
                iterationX=0;
                iterationY=0; 
                let classX = "case__player_one";
                iterationX--;    
                iterationY=iterationX+1;
                $('#case-'+(x-iterationX)+'-'+y).addClass(classX);
                $('#case-'+(x-iterationY)+'-'+y).removeClass(classX);
            } else if(e.key == "ArrowLeft") {
                iterationX=0;
                iterationY=0; 
                let classX = "case__player_one";
                iterationX+=1;    
                iterationY=iterationX-1;
                $('#case-'+(x)+'-'+(y-iterationX)).addClass(classX);
                $('#case-'+(x)+'-'+(y-iterationY)).removeClass(classX);
            } else if(e.key == "ArrowRight") {
                iterationX=0;
                iterationY=0; 
                let classX = "case__player_one";        
                iterationX--;    
                iterationY=iterationX+1;
                $('#case-'+(x)+'-'+(y-iterationX)).addClass(classX);
                $('#case-'+(x)+'-'+(y-iterationY)).removeClass(classX);
            }  
            if (!e.repeat)
                console.log(`Key "${e.key}" pressed  [event: keydown]`);
            else
            console.log(`Key "${e.key}" repeating  [event: keydown]`);
        });
    }
}
let obstacles = ["obstacle_one", "obstacle_two", "obstacle_three", "obstacle_four"],
    players = ["player_one", "player_two"],
    weapons = ["weapon_one", "weapon_two", "weapon_three", "weapon_four"];
let generateMap=new Map(10, 10, obstacles, players, weapons);
generateMap.generateMap();
 
 
generatePlayers() {
    for(let i = 0; i < players.length; i++) {
        let positioned = false;
        while(positioned == false) {
            // les valeurs ici ne sont pas bonnes pour la length tu as directement la donnée
            // avec la taille fournie quand tu inities ta map.
            let nbRandY = this.generateRandomNumber(this.generatedMap.length);
            let nbRandX = this.generateRandomNumber(this.generatedMap[i].length);
            // premier cas : je vérifie que la case en question est disponible
            if (this.generatedMap[nbRandY][nbRandX] == 0) {
                // j'initie toutes les cases à vérifier comme si elles étaient bloquées
                let top_case = "blocked";
                let down_case = "blocked";
                let left_case = "blocked";
                let right_case = "blocked";
                // je vérifie la case du dessus
                if (typeof this.generatedMap[nbRandY - 1] !== 'undefined') {
                    if (this.generatedMap[nbRandY - 1][nbRandX] == "p1" || this.generatedMap[nbRandY - 1][nbRandX] == "p2") {
                        // si un joueur est présent alors on relance la boucle while
                        continue
                    } else {
                        // sinon j'attribue la valeur de la case
                        top_case = this.generatedMap[nbRandY - 1][nbRandX]
                    }
                // je vérifie la case du dessous
                } else if (typeof this.generatedMap[nbRandY + 1] !== 'undefined'){
                    if (this.generatedMap[nbRandY + 1][nbRandX] == "p1" || this.generatedMap[nbRandY + 1][nbRandX] == "p2") {
                        continue
                    } else {
                        down_case = this.generatedMap[nbRandY + 1][nbRandX]
                    }
                // je vérifie la case de gauche
                } else if (typeof this.generatedMap[nbRandY][nbRandX - 1] !== 'undefined'){
                    if (this.generatedMap[nbRandY][nbRandX - 1] == "p1" || this.generatedMap[nbRandY][nbRandX - 1] == "p2"){
                        continue
                    } else {
                        left_case = this.generatedMap[nbRandY][nbRandX - 1]
                    }
                // je vérifie la case de droite
                } else if (typeof this.generatedMap[nbRandY][nbRandX + 1] !== 'undefined'){
                    if (this.generatedMap[nbRandY][nbRandX - 1] == "p1" || this.generatedMap[nbRandY][nbRandX - 1] == "p2"){
                        continue
                    } else {
                        right_case = this.generatedMap[nbRandY][nbRandX + 1]
                    }
                }
                
                // ici il faudrait que tu vérifies la valeur de toutes les cases 
                // et vérifier qu'elles ne sont pas toutes égales à un obstacle
            }
        }
    }
}
(()=>{"use strict";function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}for(var t=function(){function t(e,a,i,s,o,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=e,this.y=a,this.obstacles=i,this.weapons=s,this.generatedMap=[],this.activePlayer=o,this.players=n}var a,i;return a=t,(i=[{key:"createMatrix",value:function(){for(var e=0;e<this.y;e++){this.generatedMap[e]=[];for(var t=0;t<this.x;t++)this.generatedMap[e][t]=0}}},{key:"generateRandomNumber",value:function(e){if(-1!==Math.floor(Math.random()*e))return Math.floor(Math.random()*e)}},{key:"positionPlayer",value:function(){for(var e=0;e<this.players.length;e++)for(var t=!1;0==t;){var a=this.generateRandomNumber(this.generatedMap.length),i=this.generateRandomNumber(this.generatedMap.length);if(0==this.generatedMap[i][a]){var s="ob",o="ob",n="ob",r="ob";if(i-1>=0){if(this.generatedMap[i-1][a]==this.players[0].name||this.generatedMap[i-1][a]==this.players[1].name)continue;s=this.generatedMap[i-1][a]}if(i+1<this.y){if(this.generatedMap[i+1][a]==this.players[0].name||this.generatedMap[i+1][a]==this.players[1].name)continue;o=this.generatedMap[i+1][a]}if(a-1>=0){if(this.generatedMap[i][a-1]==this.players[0].name||this.generatedMap[i][a-1]==this.players[1].name)continue;n=this.generatedMap[i][a-1]}if(a+1<this.x){if(this.generatedMap[i][a+1]==this.players[0].name||this.generatedMap[i][a+1]==this.players[1].name)continue;r=this.generatedMap[i][a+1]}if(s.toString().includes("ob")&&o.toString().includes("ob")&&n.toString().includes("ob")&&r.toString().includes("ob"))continue;this.generatedMap[i][a]=this.players[e].name,this.players[e].x=a,this.players[e].y=i,t=!0}}}},{key:"positionWeapon",value:function(e){for(var t=0;t<e.length;t++)for(var a=!1;0==a;){var i=this.generateRandomNumber(this.generatedMap.length),s=this.generateRandomNumber(this.generatedMap.length);0==this.generatedMap[s][i]&&(this.generatedMap[s][i]=e[t].weapon,a=!0)}}},{key:"positionObstacle",value:function(e){for(var t=0;t<this.y;t++)for(var a=this.generateRandomNumber(.4*this.y),i=0;i<a;i++)for(var s=!1;0==s;){var o=this.generateRandomNumber(e.length),n=this.generateRandomNumber(this.y);0==this.generatedMap[t][n]&&(this.generatedMap[t][n]=e[o],s=!0)}}},{key:"generateMap",value:function(){this.createMatrix(this.x,this.y),this.positionPlayer(this.players),console.log("joueur positionné"),this.positionWeapon(this.weapons),console.log("armes positionné"),this.positionObstacle(this.obstacles),console.log("obstacles positionné")}},{key:"getNextPosition",value:function(e){var t,a=[this.activePlayer.y,this.activePlayer.x],i=[this.activePlayer.y,this.activePlayer.x];switch(e){case"ArrowUp":i[0]=this.activePlayer.y-1,t=this.generatedMap[i[0]][this.activePlayer.x];break;case"ArrowDown":i[0]=this.activePlayer.y+1,t=this.generatedMap[i[0]][this.activePlayer.x];break;case"ArrowLeft":i[1]=this.activePlayer.x-1,t=this.generatedMap[this.activePlayer.y][i[1]];break;case"ArrowRight":i[1]=this.activePlayer.x+1,t=this.generatedMap[this.activePlayer.y][i[1]]}return[a,i,t]}},{key:"checkPosition",value:function(e,t){var a=this.activePlayer.previousPosition,i=this.getNextPosition(e,this.activePlayer.x,this.activePlayer.y),s=i[2],o=i[1][0],n=i[1][1],r=t[0],l=t[1],h=t[0]-4,c=t[0]+4,p=t[1]-4,y=t[1]+4,v=parseInt(o)+""+parseInt(n);if(console.log("Start position: ["+t+"]"),console.log("New Position: ["+v+"]"),console.log("Previous Position: ["+a+"]"),-1==$.inArray(s,this.obstacles)&&s!==this.players[0].name&&s!==this.players[1].name)if(o!==h&&o!==c&&n!==p&&n!==y)if(n==l||o==r)if(v==a)console.log("ERROR: Impossible to go on previous position");else{this.activePlayer.previousWeapon?(this.generatedMap[this.activePlayer.y][this.activePlayer.x]=this.activePlayer.previousWeapon,this.activePlayer.previousWeapon=null):this.generatedMap[this.activePlayer.y][this.activePlayer.x]=0,this.generatedMap[o][n]=this.activePlayer.name,this.activePlayer.previousPosition=parseInt(this.activePlayer.y)+""+parseInt(this.activePlayer.x),this.activePlayer.y=o,this.activePlayer.x=n;for(var u=this.weapons.length,g=0;g<u;g++)s==this.weapons[g].weapon&&(this.activePlayer.previousWeapon=this.activePlayer.weapon,this.activePlayer.weapon=s,console.log("Case weapon: ["+s+"]"),i.push(this.activePlayer.weapon,this.activePlayer.previousWeapon),this.updateWeapon(i));this.updateMap(i,this.activePlayer)}else console.log("ERROR: Impossible to turn from current direction");else console.log("ERROR: Impossible to go more than 3 steps forward");else console.log("Case obstacle: ["+s+"]");s==this.players[1].name&&console.log("Case player: ["+s+"]")}},{key:"makeStep",value:function(e,t){switch(e){case"ArrowUp":this.activePlayer.y-1>=0?this.checkPosition("ArrowUp",t):console.log("ERROR: Can't go outside the top border");break;case"ArrowDown":this.activePlayer.y+1<this.y?this.checkPosition("ArrowDown",t):console.log("ERROR: Can't go outside the bottom border");break;case"ArrowLeft":this.activePlayer.x-1>=0?this.checkPosition("ArrowLeft",t):console.log("ERROR: Can't go outside the left border");break;case"ArrowRight":this.activePlayer.x+1<this.x?this.checkPosition("ArrowRight",t):console.log("ERROR: Can't go outside the right border")}}},{key:"updateMap",value:function(e,t){var a=e[0][0]+""+e[0][1],i=e[1][0]+""+e[1][1];$.ajax({success:function(){$("#case-"+i).addClass("case__"+t.name),$("#case-"+a).removeClass("case__"+t.name)}})}},{key:"updateWeapon",value:function(e){var t=e[1][0]+""+e[1][1],a=e[3],i=e[4];console.log("Current weapon: ["+a+"]"),console.log("Previous weapon: ["+i+"]"),$.ajax({success:function(){$("#case-"+t).removeClass().addClass("case case__"+i)}})}},{key:"visualizeMap",value:function(){for(var e=$(".map-grid"),t=0;t<this.generatedMap.length;t++)for(var a=$('<div id="row-'+[t]+'"class="map-grid__row"></div>'),i=0;i<this.generatedMap[t].length;i++){var s=$("<div></div>");s.addClass("case"),s.attr("id","case-"+[t]+[i]),s.text(this.generatedMap[t][i]),e.append(a),a.append(s),s.each((function(){var e="case__"+$(this).text();$(this).empty(),$(this).addClass(e)}))}}}])&&e(a.prototype,i),t}(),a=function e(t,a,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=t,this.x=a,this.y=i,this.previousPosition,this.previousWeapon,this.health=100,this.weapon="weapon_0"},i=function e(t,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.weapon=t,this.dommage=a},s=[],o=[],n=0;n<2;n++){var r=new a("player_"+[n]);s.push(r)}for(var l=0;l<4;l++){var h=new i("weapon_"+[l]);o.push(h)}var c=new t(10,10,["obstacle_one","obstacle_two","obstacle_three","obstacle_four"],o,s[0],s);c.generateMap(),c.visualizeMap();var p=[c.activePlayer.y,c.activePlayer.x];$("#turn").on("click",(function(){c.activePlayer===s[0]?c.activePlayer=s[1]:c.activePlayer=s[0],p=[c.activePlayer.y,c.activePlayer.x],c.activePlayer.previousPosition=null,console.log(c.generatedMap)})),document.addEventListener("keydown",(function(e){c.makeStep(e.key,p),e.repeat?console.log('Key "'.concat(e.key,'" repeating  [event: keydown]')):console.log('Key "'.concat(e.key,'" pressed  [event: keydown]'))}))})();
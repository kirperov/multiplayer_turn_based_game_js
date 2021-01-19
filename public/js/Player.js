export default class Player {
    constructor(name) {
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.health = 100;
        this.weapon = 0;
    }

    movePlayer() {
        document.addEventListener('keydown', (e) => {
            let playerOne = $(".case__player_one");
            let playerOneId = playerOne.attr("id");
            let x = playerOneId.substring(5,6);
            let y = playerOneId.substring(7,8);
            let iterationX=0;
            let iterationY=0;
            let classX = "case__player_one";
            if(e.key == "ArrowUp") { 
                iterationX+=1;
                iterationY=iterationX-1;
                $('#case-'+(x-iterationX)+'-'+y).addClass(classX);
                $('#case-'+(x-iterationY)+'-'+y).removeClass(classX);               
            } else if(e.key == "ArrowDown") {
                iterationX--;    
                iterationY=iterationX+1;
                $('#case-'+(x-iterationX)+'-'+y).addClass(classX);
                $('#case-'+(x-iterationY)+'-'+y).removeClass(classX);
            } else if(e.key == "ArrowLeft") {
                iterationX+=1;    
                iterationY=iterationX-1;
                $('#case-'+(x)+'-'+(y-iterationX)).addClass(classX);
                $('#case-'+(x)+'-'+(y-iterationY)).removeClass(classX);
            } else if(e.key == "ArrowRight") {
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
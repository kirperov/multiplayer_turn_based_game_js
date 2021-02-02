export default class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.health = 100;
        this.weapon = 0;
    }

    movePlayer(e,positionX, positionY) {
        // map.checkPosition(posX,posY)
            let iterationX=0;
            let iterationY=0;
            let position = positionY+''+positionX;
            let classX = "case__player_one";
            if(e.key == "ArrowUp") { 
                iterationX+=10;
                let newPosition = (position-iterationX);
                $("#case-"+(newPosition)).addClass(classX);
                $('#case-'+position).removeClass(classX);        
            } else if(e.key == "ArrowDown") {
                iterationX--;    
                iterationY=iterationX+1;
                $('#case-'+(positionX-iterationX)+'-'+positionY).addClass(classX);
                $('#case-'+(positionX-iterationY)+'-'+positionY).removeClass(classX);
            } else if(e.key == "ArrowLeft") {
                iterationX+=1;    
                iterationY=iterationX-1;
                $('#case-'+(positionX)+'-'+(positionY-iterationX)).addClass(classX);
                $('#case-'+(positionX)+'-'+(positionY-iterationY)).removeClass(classX);
            } else if(e.key == "ArrowRight") {
                iterationX--;    
                iterationY=iterationX+1;
                $('#case-'+(positionX)+'-'+(positionY-iterationX)).addClass(classX);
                $('#case-'+(positionX)+'-'+(positionY-iterationY)).removeClass(classX);
            }  

 
        //TODO CHECK CASE
    }
}
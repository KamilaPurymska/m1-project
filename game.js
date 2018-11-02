'use strict'

function Game(canvasElement){
    this.player = null;
    this.obsticles = [];
    this.gameOver = false;
    this.canvasElement = canvasElement;
    this.initialPostionPlayer = {
        x: this.canvasElement.width / 2,
        y: this.canvasElement.height
    }
    
        
    }


Game.prototype.start = function () {

    this.ctx = this.canvasElement.getContext('2d');
   
    this.startLoop();
   
    setTimeout(function () {
      this.finishGame();
    }.bind(this),10000);
   
   }


Game.prototype.startLoop = function(){

    this.player = new Player(this.canvasElement, this.initialPostionPlayer);
    this.obsticles.push(new Obsticle(this.canvasElement))

    this.handleKeyDown = function (event){
        if (event.key === 'ArrowLeft') {
            this.player.setDirection(-1)
            } else if(event.key === 'ArrowRight'){
                this.player.setDirection(1);
            }
            this.player.move();
        }.bind(this)

    
    document.addEventListener('keydown', this.handleKeyDown);


    var loop = function (){ 
        
       if(Math.random() > 0.97){
           this.obsticles.push(new Obsticle(this.canvasElement));
        }

        this.updateAll();
        this.clearAll();
        this.drawAll();
        
        if (!this.gameOver) {
            requestAnimationFrame(loop);
          }
    
    }.bind(this)
    
    loop();
}

Game.prototype.onGameOverCallback = function(callback){
    this.gameOverCallback = callback;
}


Game.prototype.updateAll = function(){
    this.player.update();
    this.obsticles.forEach(function(obsticle){
        obsticle.update();
    })

}

Game.prototype.clearAll = function(){
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.obsticles.filter(function(obsticle){
        return obsticle.inCanvas();
    })
}

Game.prototype.drawAll = function(){
    this.player.draw();
    this.obsticles.forEach(function(obsticle){
        obsticle.draw();
    })

}

Game.prototype.finishGame = function(){
    this.gameOver = true;
    this.gameOverCallback();
   
}


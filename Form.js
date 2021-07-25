class Form{
constructor(){
    this.title=createElement('h2');
    this.inputBox = createInput('enter your name');
    this.button= createButton('play');
    this.greeting = createElement('h3');
    this.reset = createButton('reset');
    this.howToPlay= createButton('how to play');
    this.close=createButton('exit');

}
display(){
    this.title.html(" FIGHTING NINJA ");
    this.title.position(displayWidth/2-50,50);
    this.inputBox.position(displayWidth/2+150,displayHeight/2);
    this.button.position(displayWidth/2+200,displayHeight/2+50);
    this.reset.position(100,100);
    this.howToPlay.position(displayWidth-200,100);
    this.button.mousePressed(()=>{
        this.inputBox.hide();
        this.button.hide();
        var playerName = this.inputBox.value();
        this.greeting.html('welcome '+ playerName);
        this.greeting.position(displayWidth/2,displayHeight/2);
        playerCount = playerCount+1; 
        gameObj.updatePlayerCount(playerCount);
        gameObj.updatePlayerName(playerName);


    });
    this.reset.mousePressed(()=>{
        gameObj.updatePlayerCount(0);
        gameObj.updateGameState(0);
    });
  /*  this.howToPlay.mousePressed(()=>{
        this.howToPlay.html('the move');
        this.close.display();
        this.close.position(displayWidth/2+200,displayHeight/2);
    });
    this.close.mousePressed(()=>{
        this.howToPlay.hide();
    })*/

}
hideElements(){
    this.inputBox.hide();
    this.button.hide();
    this.howToPlay.hide();
    this.greeting.hide();
    this.title.hide();
}
}
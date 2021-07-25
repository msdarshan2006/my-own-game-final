class Game{
    constructor(){

    }

  getGameState(){
    var dbRef = database.ref("gameState");
    //on function is a listner function which is  used to read the data
    dbRef.on("value",function(data){

        gameState=data.val();
    });
    }

    startGame(){
        if (gameState===0){
            //object construted for game form class and will call constructor of same class
            gameObj.getPlayerCount();
            console.log("playerCount");
            formObj = new Form();
            formObj.display();
        }
        // adding animation for player1
        player1=createSprite(500,700);
        player1.addAnimation("player1idle",pli1);
        player1.addAnimation("player1front",plf1);
        player1.addAnimation("player1back",plb1);
        player1.addAnimation("player1Attack1",p1a1);
        player1.addAnimation("player1Attack2",p1a2);
        player1.scale=2
        // adding animation for player2
        player2=createSprite(900,700);
        player2.addAnimation("player2idle",pli2);
        player2.addAnimation("player2front",plf2);
        player2.addAnimation("player2back",plb2);
        player2.addAnimation("player2Attack1",p2a1);
        player2.addAnimation("player2Attack2",p2a2);
        player2.scale=2
        
        // read position x from datbase
        var player1Ref=database.ref('player1/position');
        player1Ref.on("value",function(data){
            player1.x=data.val().x;
            player1.y=data.val().y;
            

        })
        database.ref("player1/animations").on("value",function(data){
            player1Left=data.val().left;
            player1Right=data.val().right;
            player1Attack=data.val().attack1;
        })
        database.ref("player1/playerHealth").on("value",function(data){
            player1Health=data.val()
        })
        database.ref("player2/animations").on("value",function(data){
            player2Left=data.val().left;
            player2Right=data.val().right;
            player2Attack=data.val().attack1;
        })
        var player2Ref=database.ref('player2/position');
        player2Ref.on("value",function(data){
            player2.x=data.val().x;
            player2.y=data.val().y;
        })
        database.ref("player2/playerHealth").on("value",function(data){
            player2Health=data.val()
        })

    }
    updateGameState(newState){
        console.log("update game state")
        var dbRef =database.ref('/').update(
            {
                gameState:newState
                
            }
        )
    }
    updatePlayerName(newName){
        database.ref("player"+playerCount).update({
            playerName:newName
                });

    }
    updatePlayerCount(newPlayerCount){
        database.ref("/").update({
            playerCount:newPlayerCount
        });

    }
    getPlayerCount(){
        var dbRef = database.ref("playerCount");
        //on function is a listner function which is  used to read the data
        dbRef.on("value",function(data){
        
    
            playerCount=data.val();
        });
    }
    playGame(){
        /* the ground should be displayed
           the players should be displayed
           the moves of player shaould be displayed 
           the health bar should be displayed 
            */
           console.log("gamehasstarted");
           formObj.hideElements();
           gameObj.barStatus("player1Health",50,player1Health,"green");
           gameObj.barStatus("player2Health",100,player2Health,"red");

           if(keyDown("RIGHT_ARROW")){
              this.updatePlayer1Right();
            this.writePlayer1Position(+5,0);
           } 
           if(keyDown("LEFT_ARROW")){
         this.updatePlayer1Left();
            this.writePlayer1Position(-5,0);
           }     
           if(keyDown("a")){
           this.updatePlayer2Left();
            this.writePlayer2Position(-5,0);
           } 
           if(keyDown("d")){
           this.updatePlayer2Right();
           this.writePlayer2Position(+5,0);
           }
           if(keyWentDown("w")){
                this.updatePlayer1Attack();
           }
           if(keyWentDown("o")){
            player1.changeAnimation("player1Attack2",p1a2);
           }
           if(keyWentDown("n")){
            this.updatePlayer2Attack();
           }
           if(keyWentDown("s")){
            player2.addAnimation("player2Attack2",p2a2);
           }
           if(player1Left){
             player1.changeAnimation("player1back",plb1);
           }
           if(player1Right){
                player1.changeAnimation("player1front",plf1);
           }
           if(player2Left){
                 player2.changeAnimation("player2front",plf2);
           }
           if(player2Right){
            player2.changeAnimation("player2back",plb2);
           }
           if(player1Attack){
               player1.changeAnimation("player1Attack1",p1a1);
           }
           if(player2Attack){
            player2.changeAnimation("player2Attack1",p2a1);
           }
           drawSprites();
           if(player1.isTouching(player2)&&player1Attack){
            //update player2 health in db
            console.log("player1is hitting")
            database.ref("player2/").update({
                playerHealth: player2Health-0.25
            })
            
           }
           if(player2.isTouching(player1)&& player2Attack){
            //update player1 health in db   
            console.log("player2 is hitting")
            database.ref("player1/").update({
                playerHealth: player1Health-0.25
            })
           }   
           if(player1Health===1){
               alert("player1 lost the game");
               gameState=2;
               gameObj.updateGameState(2);
           }   
           if(player2Health===1){
            alert("player2 lost the game")
            gameState=2;
            gameObj.updateGameState(2);
            
        }    

           

    }
    writePlayer1Position(x,y){
        database.ref("player1/position").update({
            x:player1.x+x,
            y:player1.y+y
        })
    }
    writePlayer2Position(x,y){
        database.ref("player2/position").update({
            x:player2.x+x,
            y:player2.y+y
        })
    }

    updatePlayer1Left(){
        database.ref("player1/animations").update({
            left:true,
            right:false,
            attack1:false
        })
    }
    updatePlayer1Right(){
        database.ref("player1/animations").update({
            left:false,
            right:true,
            attack1:false
        })
        
    }
    updatePlayer2Right(){
        database.ref("player2/animations").update({
            left:false,
            right:true,
            attack1:false
        })
        
    }
    updatePlayer2Left(){
        database.ref("player2/animations").update({
            left:true,
            right:false,
            attack1:false
        })
        
    }
    updatePlayer1Attack(){
        database.ref("player1/animations").update({
            left:false,
            right:false,
            attack1:true
        })
    }
    updatePlayer2Attack(){
        database.ref("player2/animations").update({
            left:false,
            right:false,
            attack1:true
        })
    }
     barStatus(type,y,w,color){ 
        stroke(color);
        fill(color);
        textSize(15);
        text(type,width-150,y-10); 
        fill("WHITE");
        rect(width-150,y,100,20);
        fill(color);
        rect(width-150,y,w,20);
    }
    


}

import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

class GameControle{
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    direction:string = '';
    isLive:boolean = true;
    timeoutID:NodeJS.Timeout | number | null = null;
    status:boolean = true;

    constructor (){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
        this.gamePause();
    }

    
    init(){
        document.addEventListener('keydown',this.keyDownHandler.bind(this));
        this.run();
    }
    //Add key controle to move snake
    keyDownHandler(event:KeyboardEvent){
        this.direction = event.key;
    }

    run(){
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction){
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;    
            case "ArrowRight":
            case "Right":
                X += 10;
                break;       
        }

        this.checkEat(X,Y)
        //Handle the error (if the snake is dead)
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e:any){
            alert(e.message + 'GAME OVER !');
            this.isLive = false;
        }
        this.gameStart();
    }

    gameStart(){
        if (this.isLive!){
            this.timeoutID = setTimeout(this.run.bind(this), 300 - (this.scorePanel.level-1)*30);
        }
    }
    gamePause(){
        const pause = document.getElementById('btn-pause');
        
        pause!.addEventListener('click', ()=>{
            if (this.status === true){
                clearTimeout(this.timeoutID!);
                pause!.innerHTML = 'Start';
                this.status = false;
            }else{
                this.gameStart();
                pause!.innerHTML = 'Pause';
                this.status = true;
            }
            
        })
        
    }
     //Check if snake is eating food
    checkEat(X:number,Y:number){
        if (X === this.food.X && Y === this.food.Y) {
            //refresh food after eat
            this.food.change();
            //add point to the scorePanel
            this.scorePanel.addScore();
            //add body to snake after eat
            this.snake.addBody();
        }
        
    }
    
    
}

export default GameControle;
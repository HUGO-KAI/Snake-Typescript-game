class Snake{
    //head of snake
    head:HTMLElement;
    //body of snake
    bodies:HTMLCollection;
    //snake
    element:HTMLElement;

    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!;
        this.bodies = this.element.getElementsByTagName('div');
    }
    //get position of snake's head
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
    //set position of snake's head
    set X(value:number){
        if (this.X === value){
            return;
        }
        //Encadrer le movement horizontal
        if(value < 0 || value > 290){
            throw new Error('Vous avez touché la mur,')
        }
        //Interdir le movement contresens horizontal
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            if (value > this.X){
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        }

        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    set Y(value:number){
        if (this.Y === value){
            return;
        }
        //Encadrer le movement vertical
        if(value < 0 || value > 290){
            throw new Error('Vous avez touché la mur,')
        }
        //Interdir le movement contresens vertical
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if (value > this.Y){
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }

        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    addBody(){
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    moveBody(){
        for (let i=this.bodies.length-1; i>0; i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + "px";
            (this.bodies[i] as HTMLElement).style.top = Y + "px";
        }
    }
    //Vérifier si la tête a double son corps
    checkHeadBody(){
        for (let i=1; i<this.bodies.length;i++){
            let bd= this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                throw new Error('Le serpent a touché son corps!')
            }
        }
    }

}

export default Snake;

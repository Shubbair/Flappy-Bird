class Floor{
    constructor(x,y,w,h,img){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }

    show(){
        image(this.img,this.x,this.y,this.w,this.h);
    }

    collide(bird){
        if(bird.y + bird.height - 8 > this.y){
            return true;
        }
    }
}
class Mario extends Sprite {
    private mario
    constructor() {
        super()
        this.init()
    }
    private init() {

        this.mario = this.createBitmap('sprite.MarioStanding')
        this.addChild(this.mario)
        
        log(this.mario)

    }
    public stand() {
        if (this.mario) {
            this.removeChild(this.mario)
        }
        this.x = this.x
        this.mario = this.createBitmap('sprite.MarioStanding')
        this.addChild(this.mario)
    }
    public run() {
        if (this.mario) {
            this.removeChild(this.mario)
        }

        let marioData = RES.getRes("smallMario_json")
        let marioTextrue = RES.getRes("smallMario_png")
        let marioFactory = new egret.MovieClipDataFactory(marioData, marioTextrue)
        this.mario = new egret.MovieClip(marioFactory.generateMovieClipData("smallMario"))
        // mario.x = this.x
        // mario.y = this.y
        this.mario.anchorOffsetX = this.mario.width / 2;
        this.mario.anchorOffsetY = this.mario.height / 2;
        this.mario.x = this.mario.anchorOffsetX;
        this.mario.y = this.mario.anchorOffsetY;
        this.mario.gotoAndPlay(0, -1);
        
        this.addChild(this.mario);

    }
    moveRight(direction: string) {
        this.mario.scaleX = 1
        this.x += 10

    }
    moveLeft(direction: string) {
        this.mario.scaleX = -1
        this.x -= 10
    }
}
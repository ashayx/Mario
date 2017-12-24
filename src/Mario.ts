class Mario extends Sprite {
    private mario
    public status 
    private scaleNumber: number = 5
    public speed: number 
    constructor() {
        super()
        this.init()
    }
    private init() {
        this.mario = this.createBitmap('sprite.MarioStanding')
        this.addChild(this.mario)

        this.setup()
    }
    private setup() {
        this.speed = 15
        this.scaleX = this.scaleY = this.scaleNumber
        this.anchorOffsetX = this.mario.width / 2
        this.anchorOffsetY = this.mario.height / 2
        this.status = 'stand'
    }
    public stand() {
        if (this.mario) {
            this.removeChild(this.mario)
        }
        this.status = 'stand'
        this.mario = this.createBitmap('sprite.MarioStanding')
        this.addChild(this.mario)
    }
    public run() {
       
        if (this.status == 'stand' && this.mario) {
            this.removeChild(this.mario)
            this.status = 'run'
    
            let marioData = RES.getRes("smallMario_json")
            let marioTextrue = RES.getRes("smallMario_png")
            let marioFactory = new egret.MovieClipDataFactory(marioData, marioTextrue)
            this.mario = new egret.MovieClip(marioFactory.generateMovieClipData("smallMario"))

            // this.mario.anchorOffsetX = this.mario.width / 2
            // this.mario.anchorOffsetY = this.mario.height / 2
            // this.mario.x = this.mario.anchorOffsetX
            // this.mario.y = this.mario.anchorOffsetY
            this.mario.gotoAndPlay(0, -1)
            
            this.addChild(this.mario)

        }

    }
    public flipX(direction: number) {
        this.scaleX = direction
    }
    public moveRight() {
        this.run()
        this.flipX(this.scaleNumber)
        this.x += this.speed
    }
    public moveLeft() {
        this.run()
        this.flipX(-this.scaleNumber)
        this.x += -this.speed
    }
    public jump() {
        this.y -= 20
        if (this.mario) {
            this.removeChild(this.mario)
        }
        this.status = 'stand'
        this.mario = this.createBitmap('sprite.MarioJumping')
        this.addChild(this.mario)
    }
    fallDown() {
        var g = 5
        this.y += g
        g += .5

        
        if (this.y >= 500) {
            this.y = 500
        }
    }
}
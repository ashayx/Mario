const config = {
    g: .1, 
    gy: 0, // 下落速度
    vy: 0, 
    ax: .2, // 水平加速度
    maxSpeedx: 3.5, // 水平最大速度
    jumpvy: 6, // 上跳速度
    jumpHeight: 5.5,
    isInertia: false, 
    isBrake: false,
    direction: 1,
}
class Mario extends Page {
    private mario
    public status 
    private scaleNumber: number = 1
    public speed: number 
    private g: number = 1
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
        this.speed = 0
        this.scaleX = this.scaleY = this.scaleNumber
        this.anchorOffsetX = this.mario.width / 2
        this.anchorOffsetY = this.mario.height / 2
        this.status = 'stand'
    }
    public stand() {
        this.speed = 0
        this.status = 'stand'
        if (this.mario) {
            this.removeChild(this.mario)
        }
        this.mario = this.createBitmap('sprite.MarioStanding')
        this.addChild(this.mario)
    }
    // run sprite 
    public run() {
        
        if (this.status != 'run' && this.mario) {
            this.removeChild(this.mario)
            this.status = 'run'
            
            // let marioData = RES.getRes("smallMario_json")
            // let marioTextrue = RES.getRes("smallMario_png")
            // let marioFactory = new egret.MovieClipDataFactory(marioData, marioTextrue)
            // this.mario = new egret.MovieClip(marioFactory.generateMovieClipData("smallMario"))
            // this.mario.gotoAndPlay(0, -1)
            this.mario = this.createMovieClip('smallMario')
            
            this.addChild(this.mario)
        }
        
    }
    // 急刹车
    public skidding(direction: number) {
        if (this.status == 'run' && this.mario) {
            this.removeChild(this.mario)
            this.status = 'skidding'
            this.mario = this.createBitmap('sprite.MarioSkidding')
            this.addChild(this.mario)
        }
        // log('skidding',this.speed)
        this.speed -= config.ax
        this.x += this.speed * direction
        if (this.speed <= 0) {
            this.speed = 0
            config.isBrake = false
            this.stand()
        }
    }
    public flipX(direction: number) { //direction,右1，左-1
        this.scaleX = direction
    }
    private addSpeed() { 

        this.speed += config.ax 
        if(this.speed >= config.maxSpeedx) {
            this.speed = config.maxSpeedx
        }
        
    }
    /**
     * inertia 惯性he减速度
     */
    public inertia(direction: number) {
        this.run()
        this.speed -= config.ax
        this.x += this.speed * direction
        if (this.speed <= 0) {
            this.speed = 0
            config.isInertia = false
            this.stand()
        }
        // log('inertia')
    }
    public move(direction: number) {//direction,右1，左-1
        this.run()
        this.addSpeed()
        this.flipX(this.scaleNumber * direction)
        this.x += this.speed * direction
        // log('move')
    }
    public jump() {
        // 向上弹跳速度
        this.status = 'jump'
        config.jumpvy -= config.g
        this.y -= config.jumpvy
         
        if (this.mario) {
            this.removeChild(this.mario)
        }
        this.mario = this.createBitmap('sprite.MarioJumping')
        this.addChild(this.mario)
    }
    public fallDown() {
        config.gy += config.g 
        this.y += config.gy
        // this.status = 'fallDown'
        
        if (this.y >= 240 - 32 - this.height / 2) {
            this.y = 240 - 32 - this.height / 2
            config.gy = 0
            config.jumpvy = config.jumpHeight
        }
    }
}
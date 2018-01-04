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
    tileMapX: 0,
}
class Mario extends Page {
    private mario
    public status 
    private scaleNumber: number = 1
    public speed: number 
    private g: number = 1
    private map
    private tilePosition 
    private tileMapX 
    constructor(map) {
        super()
        this.map = map 
        this.init()
    }
    private init() {
        this.mario = this.createBitmap('sprite.MarioStanding')
        this.addChild(this.mario)
        log(this.height)
        this.setup()
    }
    private top
    private down
    private left
    private right 
    private setup() {
        this.speed = 0
        this.scaleX = this.scaleY = this.scaleNumber
        this.anchorOffsetX = this.mario.width / 2
        this.anchorOffsetY = this.mario.height / 2
        this.status = 'stand'
        this.tilePosition = this.getBlockPosition()

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
        // for (let i = 0; i < this.tilePosition.length; i++) {
        //     let e = this.tilePosition[i]
        //     if (e.x + config.tileMapX > 0 && e.x + config.tileMapX < 240) { // 判断在屏幕内
        //         if (this.down >= e.y && this.top <= e.y + 16) {
        //             if (this.right > e.x + config.tileMapX && this.left < e.x + config.tileMapX + 16) {
        //                 this.x = e.x
        //                 log('撞墙')
        //             }
        //         }
        //     }
        // }
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
        // log(this.tilePosition)
    }
    public fallDown() {
        config.gy += config.g 
        this.y += config.gy
        // this.status = 'fallDown'
        this.top = this.y - this.height / 2
        this.down = this.y + this.height / 2
        this.left = this.x - this.width / 2
        this.right = this.x + this.width / 2
        
        // if (this.y >= 240 - 32 - this.height / 2) {
        //     this.y = 240 - 32 - this.height / 2
        //     config.gy = 0
        //     config.jumpvy = config.jumpHeight
        // }
        this.onTheGround(this.x, this.y)
    }
    /**
     * onTheGround
     */
    public onTheGround(x, y) {
        // log(this.status, this.x, this.y)
        for (let i = 0; i < this.tilePosition.length; i++) {
            let e = this.tilePosition[i]
            if (e.x + config.tileMapX > 0 && e.x + config.tileMapX < 240) { // 判断在屏幕内
                if (this.down >= e.y && this.top <= e.y + 16 ) {
                    if (this.right > e.x + config.tileMapX && this.left < e.x + config.tileMapX + 16) {
                        
                        // log('地面上', this.x, e.x + config.tileMapX)
                        this.y = e.y - this.height / 2
                        config.gy = 0
                        config.jumpvy = config.jumpHeight
                    }
                }
            }
        }
        
        
    }
    /**
     * getBlockPosition
     */
    public getBlockPosition() {
        let positon = []
        for (let i = 0; i < this.map.length; i++) {
            let e = this.map[i]
            let p = {
                index: e,
                x: 0,
                y: 0,
            }
            if (e > -1) { // 有砖块
                p.x = Math.floor(i / 15) * 16
                p.y = i % 15 * 16
                positon.push(p)
            }
        }

        return positon
    }
    /**
     * update
     */
    public update() {
        // 惯性减速
        if (config.isInertia) {
            this.inertia(config.direction)
        }
        // 急刹车
        if (config.isBrake) {
            // this.mario.inertia(config.direction)
            this.skidding(config.direction)
        }
        
        // log(this.status, this.x,this.y)
        this.fallDown()
    }
}
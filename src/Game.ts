const level = {
    1: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, 0, -1, -1, 0, 0, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 4, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],

}
class Game extends Page{
    constructor() {
        super()
        this.setup()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageFunc, this)
    }
    private mario
    private setUpInputs
    private tileMap
    private setup() {
        
        this.setUpInputs = {
            keydowns: {},
            actions: {},
        }
        //event
        window.addEventListener('keydown', (event) => {
            this.setUpInputs.keydowns[event.key] = 'down'
        })

        window.addEventListener('keyup', (event) => {
            this.setUpInputs.keydowns[event.key] = 'up'
        })

    }
    //给按键key绑定函数
    private registerAction(key, callback) {
        this.setUpInputs.actions[key] = callback
    }
    private bg 
    private onAddToStageFunc() {
        // this.bg = this.createBitmap('1-1_png')
        // this.addChild(this.bg)
        // 关卡
        let l = new Map(level[1])
        this.tileMap = new egret.Sprite()
        this.tileMap.addChild(l)
        this.addChild(this.tileMap)
        
        
        this.mario = new Mario(level[1])
        this.addChild(this.mario)
        this.mario.x = 100
        this.mario.y = 240 - 32 - this.mario.height / 2

        // 计时器
        this.runLoopTimer()
        // 注册按键
        this.registerAction('a', (keyStatus)=>{
            if (keyStatus == 'down') {

                if (this.mario.speed > config.maxSpeedx / 1.5 && config.direction == 1) {
                    config.isBrake = true
                } else {
                    this.mario.move(-1)
                }
            } else if (keyStatus == 'up') {
                config.isInertia = true
            } 
            config.direction = -1 
        })
        this.registerAction('d', (keyStatus) => {
            if (keyStatus == 'down') {
                // 速度大于最大速度一半，方向相反，启动急刹车
                if (this.mario.speed > config.maxSpeedx / 1.5 && config.direction == -1) {
                    config.isBrake = true
                    
                }else {
                    this.mario.move(1)
                }
            } else if (keyStatus == 'up') {
                // 松开按键惯性刹车
                config.isInertia = true
            }
            config.direction = 1
        })
        this.registerAction('k', () => {
            this.mario.jump()
        })
        this.registerAction('h', () => {
            this.changePage(new CreateMap)
        })

    }
    
    private gameTimer: egret.Timer
    private runLoopTimer() {

        this.gameTimer = new egret.Timer(1000 / 60, -1)
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
        this.gameTimer.start()

    }
    private jiansu: boolean = false
    private timerFunc() {
        let actions = Object.keys(this.setUpInputs.actions)
        
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            let status = this.setUpInputs.keydowns[key]
            if (status == 'down') {
                // 如果按键被按下, 调用注册的 action
                this.setUpInputs.actions[key]('down')
                this.jiansu = false
            } else if (status == 'up') {
                this.setUpInputs.actions[key]('up')
                this.setUpInputs.keydowns[key] = null
            }   
        }
        this.mario.update()
        // 场景移动
        if (this.mario.x >= 110) {
            // scene 移动
            this.mario.x = 110
            this.tileMap.x -= this.mario.speed
            config.tileMapX = this.tileMap.x
        } 
    
    }
    

}
class Game extends Sprite{
    constructor() {
        super()
        this.setup()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageFunc, this)
    }
    private mario
    private setUpInputs
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
    private onAddToStageFunc() {
 
        this.mario = new Mario()
        this.addChild(this.mario)
        this.mario.x = 100
        this.mario.y = 400
        log(this.mario.x,this.mario.y)


        // 计时器
        this.runLoopTimer()

        this.registerAction('a', ()=>{
            this.mario.moveLeft()
        })
        this.registerAction('d', () => {
            this.mario.moveRight()
        })
        this.registerAction('k', () => {
            this.mario.jump()
        })
        // 按键
        // 状态应该是Mario里的，按键改变状态，runloop里状态操作方法
        // window.addEventListener('keydown', (event) => {
        //     // log(event)
         

        //     if(event.key == 'k') {
        //         this.mario.jump()
        //     }

        // })
        // window.addEventListener('keyup', (event) => {
        //     // this.isRun = false 
        //     // this.status = 'stand'
        //     this.mario.stand()
        // })
    }
    
    private gameTimer: egret.Timer
    private runLoopTimer() {

        this.gameTimer = new egret.Timer(1000 / 60, -1)
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
        this.gameTimer.start()

    }
    private timerFunc() {
        let actions = Object.keys(this.setUpInputs.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            let status = this.setUpInputs.keydowns[key]
            if (status == 'down') {
                // 如果按键被按下, 调用注册的 action
                this.setUpInputs.actions[key]('down')
                log('keyStatus down')
            } else if (status == 'up') {
                this.setUpInputs.keydowns[key] = null
                log('keyStatus up')
                this.mario.stand()
            }
        }
        this.mario.fallDown()
    }
    

}
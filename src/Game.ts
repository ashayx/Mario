class Game extends Sprite{
    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageFunc, this);
    }
    private mario
    private isRun: boolean = false
    private status: string = 'stand'
    private onAddToStageFunc() {
 
        this.mario = new Mario()
        this.addChild(this.mario)
        this.mario.scaleX = this.mario.scaleY = 5
        this.mario.x = 100
        this.mario.y = 200
        log(this.mario.x,this.mario.y)


        // 计时器
        this.runLoopTimer()

        // 按键
        // 状态应该是Mario里的，按键改变状态，runloop里状态操作方法
        window.addEventListener('keydown', (event) => {
            if(!this.isRun) {
                this.isRun = true
                this.mario.run()
            }
            
            if (event.keyCode == 37) {
                // mario.move('left')
                this.status = 'moveLeft'
            } else if (event.keyCode == 39) {
                // mario.move('right')
                this.status = 'moveRight'
            } else if (event.keyCode == 38) {
                // this.ChangeBgScene('bg1')
            } else if (event.keyCode == 40) {
                // this.ChangeBgScene('bg2')
            }
        })
        window.addEventListener('keyup', (event) => {
            this.isRun = false 
            this.status = 'stand'
            this.mario.stand()
        })
    }
    
    private gameTimer: egret.Timer
    private runLoopTimer() {

        this.gameTimer = new egret.Timer(1000 / 60, -1)
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
        this.gameTimer.start()

    }
    private timerFunc() {
        if (this.status == 'moveRight') {
            this.mario.moveRight()
        } else if (this.status == 'moveLeft') {
            this.mario.moveLeft()
        } else {
            this.mario.stand()
        }
    }
    

}
class CreateMap extends Page {
    constructor() {
        super()
        log('创造')
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    private map
    private mapData
    private spriteIndex: number = -1
    private onAddToStage() { 
        log('创建完成按j')
        const sprite = {
            '-1': 'empty',
            '0': 'block',
            '1': 'BrickBlockBrown',
            '2': 'EmptyBlock',
            //下面为动态图片
            '3': 'QuestionBlock',
            '4': 'CoinForBlackBG',
        }
        this.drawGrid()
        this.drawProp(sprite)
        this.mapData = []
        for (let i = 0; i < 1200 / 16* 15; i++) {
            this.mapData.push(-1)
        }
        // log(this.mapData)
        

        // var isHit: boolean = propBox.hitTestPoint(79, 260, true);
        // log(isHit)

        window.addEventListener('keydown',(e)=>{
            if (e.key == 'd') {
                this.map.x -= 16
            } else if (e.key == 'a') {
                this.map.x += 16
            } else if (e.key == 'j') {
                this.changePage(new Map(this.mapData))
            }
            // log(this.map.x)
        })

        this.map.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
            // log('begin', e.stageX, e.stageY)
        }, this)
        this.map.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
            // log('move',e.stageX,e.stageY)
            let x = Math.floor(e.localX / 16)  //x ,y 为格子位置
            let y = Math.floor(e.localY / 16)
            this.drawBlock(x, y, sprite)
            this.changeMapData(x, y)
        }, this)
        this.map.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
            // log('end',e.stageX, e.stageY,e.localX)
            // log(this.mapData)
        }, this)
        this.map.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
         
            // log('tap', e.localX, e.localY)
            let x = Math.floor(e.localX / 16)  //x ,y 为格子位置
            let y = Math.floor(e.localY / 16)
            this.drawBlock(x, y, sprite)
            this.changeMapData(x, y)
        }, this)
  
    }
    private changeMapData(x, y) {
        let num = x * 15 + y 
        this.mapData[num] = this.spriteIndex
    }
    private drawBlock(x, y, sprite) {
        let num = x * 15 + y
        if (this.mapData[num] != -1) {

            return
        }
        let b
        let name = sprite[this.spriteIndex] 
        if (this.spriteIndex < 3) {
            b = this.createBitmap(name)
        } else {
            b = this.createMovieClip(name)
        }
        b.x = x * 16
        b.y = y * 16
        this.map.addChild(b)
        log('draw')
    }
    private drawProp(sprite) {
        const pixe = 16 // 一格16像素，宽高240像素
        
        // 底部道具
        let propBox = new egret.Sprite()
        propBox.y = 250
        this.addChild(propBox)

        for (let i = -1; i < Object.getOwnPropertyNames(sprite).length -1; i++) {
            const e = sprite[i]
            let mapSprite

            if (i < 3) {
                mapSprite = this.createBitmap(e)
            } else {
                mapSprite = this.createMovieClip(e)
            }
            mapSprite.x = 30 + i * 25
            propBox.addChild(mapSprite)

            mapSprite.touchEnabled = true
            mapSprite.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
                this.spriteIndex = i
            }, this)
            log(e)
            
        }
    }
    private drawGrid() {
        let mapWidth = 2400
        this.map = new egret.Sprite()
        this.map.width = mapWidth
        this.map.height = 240
        this.addChild(this.map)

        let bg = new egret.Shape()
        bg.graphics.beginFill(0xFF00FF, .2)
        bg.graphics.drawRect(0, 0, 2400, 240)
        bg.graphics.endFill()
        this.map.addChild(bg)


        for (let i = 0; i <= mapWidth / 16; i++) {
            let x = i * 16
            let shp = this.drawLine(x, 0, x, 240)
            this.map.addChild(shp)
        }
        for (let i = 0; i < 16; i++) {
            let y = i * 16
            let shp = this.drawLine(0, y, mapWidth, y)
            this.map.addChild(shp)
        }
    }
    private drawLine(x1, y1, x2, y2): egret.Shape {
        var shp: egret.Shape = new egret.Shape()

        shp.graphics.lineStyle(0.1, 0x000000)
        shp.graphics.moveTo(x1, y1)
        shp.graphics.lineTo(x2, y2)
        shp.graphics.endFill()

        return shp
    }

}
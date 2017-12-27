class Map extends Page{
    public map: Array<number>
    constructor() {
        super()
        this.map = [
            3, -1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, -1, 0, 0,
            3, -1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, -1, 0, 0,
            3, -1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, -1, 0, 0,
            3, -1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, -1, 0, 0,
        ]
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageFunc, this)
    }

    private onAddToStageFunc() {
        const pixe = 16 // 一格16像素，宽高240像素
        const sprite = {
            0: 'block',
            1: 'BrickBlockBrown',
            2: 'EmptyBlock',
            //下面为动态图片
            3: 'QuestionBlock',
            4: 'CoinForBlackBG',
        }

        for (let i = 0; i < this.map.length; i++) {
            let mapIndex = this.map[i]
            let mapSprite
            if(mapIndex != -1) {
                // -1的时候不画图，为背景
                if (mapIndex < 3) {
                    mapSprite = this.createBitmap(`${sprite[mapIndex]}`)
                    this.addChild(mapSprite)
                } else {
                    mapSprite = this.createMovieClip(`${sprite[mapIndex]}`)
                    this.addChild(mapSprite)
                }
                mapSprite.x = Math.floor(i / 15) * pixe
                mapSprite.y = i % 15 * pixe
            }
        }
    
    }
}
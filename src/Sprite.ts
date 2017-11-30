class Sprite extends egret.Sprite {
    constructor() {
        super()
      
    }

    protected createBitmap(resKey: string, isACenter: boolean = false): egret.Bitmap {
        let bmp: egret.Bitmap = new egret.Bitmap(RES.getRes(resKey));
        if (isACenter) {
            bmp.anchorOffsetX = bmp.width / 2;
            bmp.anchorOffsetY = bmp.height / 2;
        }
        return bmp;
    }
}
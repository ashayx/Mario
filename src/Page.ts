class Page extends egret.Sprite {
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
    protected createMovieClip(name: string, isPlay: boolean = true): egret.MovieClip {
        let Data = RES.getRes(`${name}_json`)
        let Textrue = RES.getRes(`${name}_png`)
        let Factory = new egret.MovieClipDataFactory(Data, Textrue)

        let mc = new egret.MovieClip(Factory.generateMovieClipData(`${name}`))
        
        if(isPlay) {
            mc.gotoAndPlay(0, -1)
        }

        return mc
    }
    
    protected changePage(p: Page): void {
        if (this.parent == null) return;

        let func: Function = (obj: egret.DisplayObjectContainer) => {
            for (let i: number = 0; i < obj.numChildren; i++) {
                egret.Tween.removeTweens(obj.getChildAt(i));
                if (obj.mask != null) {
                    (<egret.DisplayObject>obj.mask).parent.removeChild((<egret.DisplayObject>obj.mask));
                    obj.mask = null;
                }
                if (obj instanceof egret.DisplayObjectContainer) {
                    func(obj.getChildAt(i));
                }
                if (obj instanceof egret.MovieClip) {
                    (<egret.MovieClip>obj).stop();
                }
                // if (obj instanceof particle.GravityParticleSystem) {
                //     (<particle.GravityParticleSystem>obj).stop(true);
                // }
            }
        };

        func(this);

        p.alpha = 0;
        p.scaleX = p.scaleY = 1.3;

        this.parent.addChild(p);
        egret.Tween.get(p).to({ "alpha": 1, "scaleX": 1, "scaleY": 1 }, 500, egret.Ease.cubicOut).call(() => {
            if (this.parent == null) return;
            this.parent.removeChild(this);
        }, this);
    }
}
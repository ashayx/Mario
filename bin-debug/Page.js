var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super.call(this) || this;
    }
    Page.prototype.createBitmap = function (resKey, isACenter) {
        if (isACenter === void 0) { isACenter = false; }
        var bmp = new egret.Bitmap(RES.getRes(resKey));
        if (isACenter) {
            bmp.anchorOffsetX = bmp.width / 2;
            bmp.anchorOffsetY = bmp.height / 2;
        }
        return bmp;
    };
    Page.prototype.createMovieClip = function (name, isPlay) {
        if (isPlay === void 0) { isPlay = true; }
        var Data = RES.getRes(name + "_json");
        var Textrue = RES.getRes(name + "_png");
        var Factory = new egret.MovieClipDataFactory(Data, Textrue);
        var mc = new egret.MovieClip(Factory.generateMovieClipData("" + name));
        if (isPlay) {
            mc.gotoAndPlay(0, -1);
        }
        return mc;
    };
    Page.prototype.changePage = function (p) {
        var _this = this;
        if (this.parent == null)
            return;
        var func = function (obj) {
            for (var i = 0; i < obj.numChildren; i++) {
                egret.Tween.removeTweens(obj.getChildAt(i));
                if (obj.mask != null) {
                    obj.mask.parent.removeChild(obj.mask);
                    obj.mask = null;
                }
                if (obj instanceof egret.DisplayObjectContainer) {
                    func(obj.getChildAt(i));
                }
                if (obj instanceof egret.MovieClip) {
                    obj.stop();
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
        egret.Tween.get(p).to({ "alpha": 1, "scaleX": 1, "scaleY": 1 }, 500, egret.Ease.cubicOut).call(function () {
            if (_this.parent == null)
                return;
            _this.parent.removeChild(_this);
        }, this);
    };
    return Page;
}(egret.Sprite));
__reflect(Page.prototype, "Page");

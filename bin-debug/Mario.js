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
var Mario = (function (_super) {
    __extends(Mario, _super);
    function Mario() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Mario.prototype.init = function () {
        this.mario = this.createBitmap('sprite.MarioStanding');
        this.addChild(this.mario);
        log(this.mario);
    };
    Mario.prototype.stand = function () {
        if (this.mario) {
            this.removeChild(this.mario);
        }
        this.x = this.x;
        this.mario = this.createBitmap('sprite.MarioStanding');
        this.addChild(this.mario);
    };
    Mario.prototype.run = function () {
        if (this.mario) {
            this.removeChild(this.mario);
        }
        var marioData = RES.getRes("smallMario_json");
        var marioTextrue = RES.getRes("smallMario_png");
        var marioFactory = new egret.MovieClipDataFactory(marioData, marioTextrue);
        this.mario = new egret.MovieClip(marioFactory.generateMovieClipData("smallMario"));
        // mario.x = this.x
        // mario.y = this.y
        this.mario.anchorOffsetX = this.mario.width / 2;
        this.mario.anchorOffsetY = this.mario.height / 2;
        this.mario.x = this.mario.anchorOffsetX;
        this.mario.y = this.mario.anchorOffsetY;
        this.mario.gotoAndPlay(0, -1);
        this.addChild(this.mario);
    };
    Mario.prototype.moveRight = function (direction) {
        this.mario.scaleX = 1;
        this.x += 10;
    };
    Mario.prototype.moveLeft = function (direction) {
        this.mario.scaleX = -1;
        this.x -= 10;
    };
    return Mario;
}(Sprite));
__reflect(Mario.prototype, "Mario");

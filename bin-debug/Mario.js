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
        _this.scaleNumber = 5;
        _this.init();
        return _this;
    }
    Mario.prototype.init = function () {
        this.mario = this.createBitmap('sprite.MarioStanding');
        this.addChild(this.mario);
        this.setup();
    };
    Mario.prototype.setup = function () {
        this.speed = 15;
        this.scaleX = this.scaleY = this.scaleNumber;
        this.anchorOffsetX = this.mario.width / 2;
        this.anchorOffsetY = this.mario.height / 2;
        this.status = 'stand';
    };
    Mario.prototype.stand = function () {
        if (this.mario) {
            this.removeChild(this.mario);
        }
        this.status = 'stand';
        this.mario = this.createBitmap('sprite.MarioStanding');
        this.addChild(this.mario);
    };
    Mario.prototype.run = function () {
        if (this.status == 'stand' && this.mario) {
            this.removeChild(this.mario);
            this.status = 'run';
            var marioData = RES.getRes("smallMario_json");
            var marioTextrue = RES.getRes("smallMario_png");
            var marioFactory = new egret.MovieClipDataFactory(marioData, marioTextrue);
            this.mario = new egret.MovieClip(marioFactory.generateMovieClipData("smallMario"));
            // this.mario.anchorOffsetX = this.mario.width / 2
            // this.mario.anchorOffsetY = this.mario.height / 2
            // this.mario.x = this.mario.anchorOffsetX
            // this.mario.y = this.mario.anchorOffsetY
            this.mario.gotoAndPlay(0, -1);
            this.addChild(this.mario);
        }
    };
    Mario.prototype.flipX = function (direction) {
        this.scaleX = direction;
    };
    Mario.prototype.moveRight = function () {
        this.run();
        this.flipX(this.scaleNumber);
        this.x += this.speed;
    };
    Mario.prototype.moveLeft = function () {
        this.run();
        this.flipX(-this.scaleNumber);
        this.x += -this.speed;
    };
    Mario.prototype.jump = function () {
        this.y -= 20;
        if (this.mario) {
            this.removeChild(this.mario);
        }
        this.status = 'stand';
        this.mario = this.createBitmap('sprite.MarioJumping');
        this.addChild(this.mario);
    };
    Mario.prototype.fallDown = function () {
        var g = 5;
        this.y += g;
        g += .5;
        if (this.y >= 500) {
            this.y = 500;
        }
    };
    return Mario;
}(Sprite));
__reflect(Mario.prototype, "Mario");

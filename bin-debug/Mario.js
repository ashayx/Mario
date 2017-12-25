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
var config = {
    g: .1,
    gy: 0,
    vy: 0,
    ax: .2,
    maxSpeedx: 3.5,
    jumpvy: 6,
    jumpHeight: 6,
    isInertia: false,
    isBrake: false,
    direction: 1,
};
var Mario = (function (_super) {
    __extends(Mario, _super);
    function Mario() {
        var _this = _super.call(this) || this;
        _this.scaleNumber = 1;
        _this.g = 1;
        _this.init();
        return _this;
    }
    Mario.prototype.init = function () {
        this.mario = this.createBitmap('sprite.MarioStanding');
        this.addChild(this.mario);
        this.setup();
    };
    Mario.prototype.setup = function () {
        this.speed = 0;
        this.scaleX = this.scaleY = this.scaleNumber;
        this.anchorOffsetX = this.mario.width / 2;
        this.anchorOffsetY = this.mario.height / 2;
        this.status = 'stand';
    };
    Mario.prototype.stand = function () {
        this.speed = 0;
        this.status = 'stand';
        if (this.mario) {
            this.removeChild(this.mario);
        }
        this.mario = this.createBitmap('sprite.MarioStanding');
        this.addChild(this.mario);
    };
    Mario.prototype.run = function () {
        if (this.status != 'run' && this.mario) {
            this.removeChild(this.mario);
            this.status = 'run';
            var marioData = RES.getRes("smallMario_json");
            var marioTextrue = RES.getRes("smallMario_png");
            var marioFactory = new egret.MovieClipDataFactory(marioData, marioTextrue);
            this.mario = new egret.MovieClip(marioFactory.generateMovieClipData("smallMario"));
            this.mario.gotoAndPlay(0, -1);
            this.addChild(this.mario);
        }
    };
    // 急刹车
    Mario.prototype.skidding = function (direction) {
        if (this.status == 'run' && this.mario) {
            this.removeChild(this.mario);
            this.status = 'skidding';
            this.mario = this.createBitmap('sprite.MarioSkidding');
            this.addChild(this.mario);
        }
        // log('skidding',this.speed)
        this.speed -= config.ax;
        this.x += this.speed * direction;
        if (this.speed <= 0) {
            this.speed = 0;
            config.isBrake = false;
            this.stand();
        }
    };
    Mario.prototype.flipX = function (direction) {
        this.scaleX = direction;
    };
    Mario.prototype.addSpeed = function () {
        this.speed += config.ax;
        if (this.speed >= config.maxSpeedx) {
            this.speed = config.maxSpeedx;
        }
    };
    /**
     * inertia 惯性he减速度
     */
    Mario.prototype.inertia = function (direction) {
        this.run();
        this.speed -= config.ax;
        this.x += this.speed * direction;
        if (this.speed <= 0) {
            this.speed = 0;
            config.isInertia = false;
            this.stand();
        }
        // log('inertia')
    };
    Mario.prototype.move = function (direction) {
        this.run();
        this.addSpeed();
        this.flipX(this.scaleNumber * direction);
        this.x += this.speed * direction;
        // log('move')
    };
    Mario.prototype.jump = function () {
        // 向上弹跳速度
        this.status = 'jump';
        config.jumpvy -= config.g;
        this.y -= config.jumpvy;
        if (this.mario) {
            this.removeChild(this.mario);
        }
        this.mario = this.createBitmap('sprite.MarioJumping');
        this.addChild(this.mario);
    };
    Mario.prototype.fallDown = function () {
        config.gy += config.g;
        this.y += config.gy;
        // this.status = 'fallDown'
        if (this.y >= 240 - 32 - this.height / 2) {
            this.y = 240 - 32 - this.height / 2;
            config.gy = 0;
            config.jumpvy = config.jumpHeight;
        }
    };
    return Mario;
}(Sprite));
__reflect(Mario.prototype, "Mario");

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
    jumpHeight: 5.5,
    isInertia: false,
    isBrake: false,
    direction: 1,
    tileMapX: 0,
};
var Mario = (function (_super) {
    __extends(Mario, _super);
    function Mario(map) {
        var _this = _super.call(this) || this;
        _this.scaleNumber = 1;
        _this.g = 1;
        _this.map = map;
        _this.init();
        return _this;
    }
    Mario.prototype.init = function () {
        this.mario = this.createBitmap('sprite.MarioStanding');
        this.addChild(this.mario);
        log(this.height);
        this.setup();
    };
    Mario.prototype.setup = function () {
        this.speed = 0;
        this.scaleX = this.scaleY = this.scaleNumber;
        this.anchorOffsetX = this.mario.width / 2;
        this.anchorOffsetY = this.mario.height / 2;
        this.status = 'stand';
        this.tilePosition = this.getBlockPosition();
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
    // run sprite 
    Mario.prototype.run = function () {
        if (this.status != 'run' && this.mario) {
            this.removeChild(this.mario);
            this.status = 'run';
            // let marioData = RES.getRes("smallMario_json")
            // let marioTextrue = RES.getRes("smallMario_png")
            // let marioFactory = new egret.MovieClipDataFactory(marioData, marioTextrue)
            // this.mario = new egret.MovieClip(marioFactory.generateMovieClipData("smallMario"))
            // this.mario.gotoAndPlay(0, -1)
            this.mario = this.createMovieClip('smallMario');
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
        // for (let i = 0; i < this.tilePosition.length; i++) {
        //     let e = this.tilePosition[i]
        //     if (e.x + config.tileMapX > 0 && e.x + config.tileMapX < 240) { // 判断在屏幕内
        //         if (this.down >= e.y && this.top <= e.y + 16) {
        //             if (this.right > e.x + config.tileMapX && this.left < e.x + config.tileMapX + 16) {
        //                 this.x = e.x
        //                 log('撞墙')
        //             }
        //         }
        //     }
        // }
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
        // log(this.tilePosition)
    };
    Mario.prototype.fallDown = function () {
        config.gy += config.g;
        this.y += config.gy;
        // this.status = 'fallDown'
        this.top = this.y - this.height / 2;
        this.down = this.y + this.height / 2;
        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;
        // if (this.y >= 240 - 32 - this.height / 2) {
        //     this.y = 240 - 32 - this.height / 2
        //     config.gy = 0
        //     config.jumpvy = config.jumpHeight
        // }
        this.onTheGround(this.x, this.y);
    };
    /**
     * onTheGround
     */
    Mario.prototype.onTheGround = function (x, y) {
        // log(this.status, this.x, this.y)
        for (var i = 0; i < this.tilePosition.length; i++) {
            var e = this.tilePosition[i];
            if (e.x + config.tileMapX > 0 && e.x + config.tileMapX < 240) {
                if (this.down >= e.y && this.top <= e.y + 16) {
                    if (this.right > e.x + config.tileMapX && this.left < e.x + config.tileMapX + 16) {
                        // log('地面上', this.x, e.x + config.tileMapX)
                        this.y = e.y - this.height / 2;
                        config.gy = 0;
                        config.jumpvy = config.jumpHeight;
                    }
                }
            }
        }
    };
    /**
     * getBlockPosition
     */
    Mario.prototype.getBlockPosition = function () {
        var positon = [];
        for (var i = 0; i < this.map.length; i++) {
            var e = this.map[i];
            var p = {
                index: e,
                x: 0,
                y: 0,
            };
            if (e > -1) {
                p.x = Math.floor(i / 15) * 16;
                p.y = i % 15 * 16;
                positon.push(p);
            }
        }
        return positon;
    };
    /**
     * update
     */
    Mario.prototype.update = function () {
        // 惯性减速
        if (config.isInertia) {
            this.inertia(config.direction);
        }
        // 急刹车
        if (config.isBrake) {
            // this.mario.inertia(config.direction)
            this.skidding(config.direction);
        }
        // log(this.status, this.x,this.y)
        this.fallDown();
    };
    return Mario;
}(Page));
__reflect(Mario.prototype, "Mario");

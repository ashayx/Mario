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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.isRun = false;
        _this.status = 'stand';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageFunc, _this);
        return _this;
    }
    Game.prototype.onAddToStageFunc = function () {
        var _this = this;
        this.mario = new Mario();
        this.addChild(this.mario);
        this.mario.scaleX = this.mario.scaleY = 5;
        this.mario.x = 100;
        this.mario.y = 200;
        log(this.mario.x, this.mario.y);
        // 计时器
        this.runLoopTimer();
        // 按键
        // 状态应该是Mario里的，按键改变状态，runloop里状态操作方法
        window.addEventListener('keydown', function (event) {
            if (!_this.isRun) {
                _this.isRun = true;
                _this.mario.run();
            }
            if (event.keyCode == 37) {
                // mario.move('left')
                _this.status = 'moveLeft';
            }
            else if (event.keyCode == 39) {
                // mario.move('right')
                _this.status = 'moveRight';
            }
            else if (event.keyCode == 38) {
                // this.ChangeBgScene('bg1')
            }
            else if (event.keyCode == 40) {
                // this.ChangeBgScene('bg2')
            }
        });
        window.addEventListener('keyup', function (event) {
            _this.isRun = false;
            _this.status = 'stand';
            _this.mario.stand();
        });
    };
    Game.prototype.runLoopTimer = function () {
        this.gameTimer = new egret.Timer(1000 / 60, -1);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.gameTimer.start();
    };
    Game.prototype.timerFunc = function () {
        if (this.status == 'moveRight') {
            this.mario.moveRight();
        }
        else if (this.status == 'moveLeft') {
            this.mario.moveLeft();
        }
        else {
            this.mario.stand();
        }
    };
    return Game;
}(Sprite));
__reflect(Game.prototype, "Game");

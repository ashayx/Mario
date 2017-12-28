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
        _this.jiansu = false;
        _this.setup();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageFunc, _this);
        return _this;
    }
    Game.prototype.setup = function () {
        var _this = this;
        this.setUpInputs = {
            keydowns: {},
            actions: {},
        };
        //event
        window.addEventListener('keydown', function (event) {
            _this.setUpInputs.keydowns[event.key] = 'down';
        });
        window.addEventListener('keyup', function (event) {
            _this.setUpInputs.keydowns[event.key] = 'up';
        });
    };
    //给按键key绑定函数
    Game.prototype.registerAction = function (key, callback) {
        this.setUpInputs.actions[key] = callback;
    };
    Game.prototype.onAddToStageFunc = function () {
        var _this = this;
        this.bg = this.createBitmap('1-1_png');
        this.addChild(this.bg);
        this.mario = new Mario();
        this.addChild(this.mario);
        this.mario.x = 100;
        this.mario.y = 240 - 32 - this.mario.height / 2;
        log(this.mario.x, this.mario.y, this.mario.height / 2);
        // 计时器
        this.runLoopTimer();
        // 注册按键
        this.registerAction('a', function (keyStatus) {
            if (keyStatus == 'down') {
                if (_this.mario.speed > config.maxSpeedx / 1.5 && config.direction == 1) {
                    config.isBrake = true;
                }
                else {
                    _this.mario.move(-1);
                }
            }
            else if (keyStatus == 'up') {
                config.isInertia = true;
            }
            config.direction = -1;
        });
        this.registerAction('d', function (keyStatus) {
            if (keyStatus == 'down') {
                // 速度大于最大速度一半，方向相反，启动急刹车
                if (_this.mario.speed > config.maxSpeedx / 1.5 && config.direction == -1) {
                    config.isBrake = true;
                }
                else {
                    _this.mario.move(1);
                }
            }
            else if (keyStatus == 'up') {
                // 松开按键惯性刹车
                config.isInertia = true;
            }
            config.direction = 1;
        });
        this.registerAction('k', function () {
            _this.mario.jump();
        });
        this.registerAction('h', function () {
            // this.changePage(new Map(this.mapData))
        });
    };
    Game.prototype.runLoopTimer = function () {
        this.gameTimer = new egret.Timer(1000 / 60, -1);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.gameTimer.start();
    };
    Game.prototype.timerFunc = function () {
        var actions = Object.keys(this.setUpInputs.actions);
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i];
            var status_1 = this.setUpInputs.keydowns[key];
            if (status_1 == 'down') {
                // 如果按键被按下, 调用注册的 action
                this.setUpInputs.actions[key]('down');
                this.jiansu = false;
            }
            else if (status_1 == 'up') {
                this.setUpInputs.actions[key]('up');
                this.setUpInputs.keydowns[key] = null;
            }
        }
        // 惯性减速
        if (config.isInertia) {
            this.mario.inertia(config.direction);
        }
        // 急刹车
        if (config.isBrake) {
            // this.mario.inertia(config.direction)
            this.mario.skidding(config.direction);
        }
        // 场景移动
        if (this.mario.x >= 110) {
            // scene 移动
            this.mario.x = 110;
            this.bg.x -= this.mario.speed;
        }
        log(this.mario.status, config.direction, this.mario.speed, this.mario.x);
        this.mario.fallDown();
    };
    return Game;
}(Page));
__reflect(Game.prototype, "Game");

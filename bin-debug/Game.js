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
        this.mario = new Mario();
        this.addChild(this.mario);
        this.mario.x = 100;
        this.mario.y = 400;
        log(this.mario.x, this.mario.y);
        // 计时器
        this.runLoopTimer();
        this.registerAction('a', function () {
            _this.mario.moveLeft();
        });
        this.registerAction('d', function () {
            _this.mario.moveRight();
        });
        this.registerAction('k', function () {
            _this.mario.jump();
        });
        // 按键
        // 状态应该是Mario里的，按键改变状态，runloop里状态操作方法
        // window.addEventListener('keydown', (event) => {
        //     // log(event)
        //     if(event.key == 'k') {
        //         this.mario.jump()
        //     }
        // })
        // window.addEventListener('keyup', (event) => {
        //     // this.isRun = false 
        //     // this.status = 'stand'
        //     this.mario.stand()
        // })
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
                log('keyStatus down');
            }
            else if (status_1 == 'up') {
                this.setUpInputs.keydowns[key] = null;
                log('keyStatus up');
                this.mario.stand();
            }
        }
        this.mario.fallDown();
    };
    return Game;
}(Sprite));
__reflect(Game.prototype, "Game");

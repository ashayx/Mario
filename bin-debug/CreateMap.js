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
var CreateMap = (function (_super) {
    __extends(CreateMap, _super);
    function CreateMap() {
        var _this = _super.call(this) || this;
        _this.spriteIndex = -1;
        log('创造');
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    CreateMap.prototype.onAddToStage = function () {
        var _this = this;
        log('创建完成按j');
        var sprite = {
            '-1': 'empty',
            '0': 'block',
            '1': 'BrickBlockBrown',
            '2': 'EmptyBlock',
            //下面为动态图片
            '3': 'QuestionBlock',
            '4': 'CoinForBlackBG',
        };
        this.drawGrid();
        this.drawProp(sprite);
        this.mapData = [];
        for (var i = 0; i < 1200 / 16 * 15; i++) {
            this.mapData.push(-1);
        }
        // log(this.mapData)
        // var isHit: boolean = propBox.hitTestPoint(79, 260, true);
        // log(isHit)
        window.addEventListener('keydown', function (e) {
            if (e.key == 'd') {
                _this.map.x -= 16;
            }
            else if (e.key == 'a') {
                _this.map.x += 16;
            }
            else if (e.key == 'j') {
                _this.changePage(new Map(_this.mapData));
                log(JSON.stringify(_this.mapData));
            }
            // log(this.map.x)
        });
        this.map.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            // log('begin', e.stageX, e.stageY)
        }, this);
        this.map.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            // log('move',e.stageX,e.stageY)
            var x = Math.floor(e.localX / 16); //x ,y 为格子位置
            var y = Math.floor(e.localY / 16);
            _this.drawBlock(x, y, sprite);
            _this.changeMapData(x, y);
        }, this);
        this.map.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            // log('end',e.stageX, e.stageY,e.localX)
            // log(this.mapData)
        }, this);
        this.map.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            // log('tap', e.localX, e.localY)
            var x = Math.floor(e.localX / 16); //x ,y 为格子位置
            var y = Math.floor(e.localY / 16);
            _this.drawBlock(x, y, sprite);
            _this.changeMapData(x, y);
        }, this);
    };
    CreateMap.prototype.changeMapData = function (x, y) {
        var num = x * 15 + y;
        this.mapData[num] = this.spriteIndex;
    };
    CreateMap.prototype.drawBlock = function (x, y, sprite) {
        var num = x * 15 + y;
        if (this.mapData[num] != -1) {
            return;
        }
        var b;
        var name = sprite[this.spriteIndex];
        if (this.spriteIndex < 3) {
            b = this.createBitmap(name);
        }
        else {
            b = this.createMovieClip(name);
        }
        b.x = x * 16;
        b.y = y * 16;
        this.map.addChild(b);
        log('draw');
    };
    CreateMap.prototype.drawProp = function (sprite) {
        var _this = this;
        var pixe = 16; // 一格16像素，宽高240像素
        // 底部道具
        var propBox = new egret.Sprite();
        propBox.y = 250;
        this.addChild(propBox);
        var _loop_1 = function (i) {
            var e = sprite[i];
            var mapSprite = void 0;
            if (i < 3) {
                mapSprite = this_1.createBitmap(e);
            }
            else {
                mapSprite = this_1.createMovieClip(e);
            }
            mapSprite.x = 30 + i * 25;
            propBox.addChild(mapSprite);
            mapSprite.touchEnabled = true;
            mapSprite.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                _this.spriteIndex = i;
            }, this_1);
            log(e);
        };
        var this_1 = this;
        for (var i = -1; i < Object.getOwnPropertyNames(sprite).length - 1; i++) {
            _loop_1(i);
        }
    };
    CreateMap.prototype.drawGrid = function () {
        var mapWidth = 2400;
        this.map = new egret.Sprite();
        this.map.width = mapWidth;
        this.map.height = 240;
        this.addChild(this.map);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xFF00FF, .2);
        bg.graphics.drawRect(0, 0, 2400, 240);
        bg.graphics.endFill();
        this.map.addChild(bg);
        for (var i = 0; i <= mapWidth / 16; i++) {
            var x = i * 16;
            var shp = this.drawLine(x, 0, x, 240);
            this.map.addChild(shp);
        }
        for (var i = 0; i < 16; i++) {
            var y = i * 16;
            var shp = this.drawLine(0, y, mapWidth, y);
            this.map.addChild(shp);
        }
    };
    CreateMap.prototype.drawLine = function (x1, y1, x2, y2) {
        var shp = new egret.Shape();
        shp.graphics.lineStyle(0.1, 0x000000);
        shp.graphics.moveTo(x1, y1);
        shp.graphics.lineTo(x2, y2);
        shp.graphics.endFill();
        return shp;
    };
    return CreateMap;
}(Page));
__reflect(CreateMap.prototype, "CreateMap");

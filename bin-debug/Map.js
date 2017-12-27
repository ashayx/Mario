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
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.map = [
            3, -1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, -1, 0, 0,
            3, -1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, -1, 0, 0,
            3, -1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, -1, 0, 0,
            3, -1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, -1, 0, 0,
        ];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageFunc, _this);
        return _this;
    }
    Map.prototype.onAddToStageFunc = function () {
        var pixe = 16; // 一格16像素，宽高240像素
        var sprite = {
            0: 'block',
            1: 'BrickBlockBrown',
            2: 'EmptyBlock',
            //下面为动态图片
            3: 'QuestionBlock',
            4: 'CoinForBlackBG',
        };
        for (var i = 0; i < this.map.length; i++) {
            var mapIndex = this.map[i];
            var mapSprite = void 0;
            if (mapIndex != -1) {
                // -1的时候不画图，为背景
                if (mapIndex < 3) {
                    mapSprite = this.createBitmap("" + sprite[mapIndex]);
                    this.addChild(mapSprite);
                }
                else {
                    mapSprite = this.createMovieClip("" + sprite[mapIndex]);
                    this.addChild(mapSprite);
                }
                mapSprite.x = Math.floor(i / 15) * pixe;
                mapSprite.y = i % 15 * pixe;
            }
        }
    };
    return Map;
}(Page));
__reflect(Map.prototype, "Map");

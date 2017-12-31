/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(1);
var createBoardSet_1 = __webpack_require__(9);
var logTime_1 = __webpack_require__(10);
var root = document.querySelector('main');
var tallyCb = function (sol) { return root.appendChild(createBoardSet_1.default(sol)); };
game_1.default(tallyCb, logTime_1.default);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var place_1 = __webpack_require__(2);
var game = function (cb, timeCb) {
    var begin = (new Date()).getTime();
    place_1.default(cb);
    var end = (new Date()).getTime();
    var timeUsed = ((end - begin) / 1000).toFixed(2);
    if (timeCb) {
        timeCb(timeUsed);
    }
    else {
        console.log("Time used: approx. " + timeUsed + " sec");
    }
};
exports.default = game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getAvails_1 = __webpack_require__(3);
var tally_1 = __webpack_require__(4);
var place = function (cb) {
    var prevs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        prevs[_i - 1] = arguments[_i];
    }
    var avails = getAvails_1.default(prevs);
    // 如果下一行還有可放的空位，繼續試
    // 如果沒有，要已經擺了 8 個的才可以送到答案紀錄（tally）去
    // 過濾對稱與旋轉解的工作交給答案紀錄處理
    if (avails.length)
        avails.forEach(function (avail) { return place.apply(void 0, [cb].concat(prevs, [avail])); });
    else if (prevs.length === 8)
        tally_1.default(prevs, cb);
};
exports.default = place;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 扣掉 prev 的對角線
// 與所有 prevs
Object.defineProperty(exports, "__esModule", { value: true });
var getUnavails = function (prevs) {
    var prevLen = prevs.length;
    var tmpSet = prevs.map(function (prev, indx) {
        var offset = prevLen - indx;
        return [prev + offset, prev - offset];
    }).reduce(function (acc, pair) { return acc.concat(pair); }, [])
        .filter(function (indx) { return indx < 8 && indx > -1; }) // 對角線
        .concat(prevs); // prevs
    return new Set(tmpSet);
};
var getAvails = function (prevs) {
    var indxs = [0, 1, 2, 3, 4, 5, 6, 7];
    if (!prevs.length)
        return indxs;
    var unavails = getUnavails(prevs);
    unavails.forEach(function (_, unavailIndx) {
        indxs = indxs.filter(function (indx) { return indx !== unavailIndx; });
    });
    return indxs;
};
exports.default = getAvails;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var duplicated_1 = __webpack_require__(5);
var getDups_1 = __webpack_require__(6);
var sols = [];
var tally = function (newSol, cb) {
    // 製造各種對稱旋轉解，並測試重複
    var dups = getDups_1.default(newSol);
    var isDuplicated = sols.some(function (sol) {
        return dups.some(function (dup) { return duplicated_1.default(dup, sol); });
    });
    if (isDuplicated)
        return;
    sols.push(newSol);
    if (cb) {
        cb(newSol);
    }
    else {
        console.log(sols.length + ".");
        console.log(newSol);
    }
};
exports.default = tally;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var duplicated = function (a, b) {
    return a.every(function (ai, indx) { return ai === b[indx]; });
};
exports.default = duplicated;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rotateModes_1 = __webpack_require__(7);
var symModes_1 = __webpack_require__(8);
var getDups = function (sol) {
    var dups = [];
    var syms = symModes_1.default.map(function (mode) { return mode(sol); });
    syms.forEach(function (sym) {
        dups = dups.concat(rotateModes_1.default.map(function (mode) { return mode(sym); }));
    });
    return dups;
};
exports.default = getDups;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// 原版
var rotateMode0 = function (indxs) { return indxs; };
// 右翻 1 次
var rotateMode1 = function (indxs) {
    var newIndxs = new Array(8);
    for (var i = 0; i < 8; i++)
        newIndxs[7 - indxs[i]] = i;
    return newIndxs;
};
// 右翻 2 次
var rotateMode2 = function (indxs) {
    var newIndxs = new Array(8);
    for (var i = 0; i < 8; i++)
        newIndxs[indxs[7 - i]] = 7 - i;
    return newIndxs;
};
// 右翻 3 次
var rotateMode3 = function (indxs) {
    var newIndxs = new Array(8);
    for (var i = 0; i < 8; i++)
        newIndxs[indxs[i]] = 7 - i;
    return newIndxs;
};
// 全部
var rotateModes = [rotateMode0, rotateMode1, rotateMode2, rotateMode3];
exports.default = rotateModes;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// 原版
var symMode0 = function (indxs) { return indxs; };
// 上下翻
var symMode1 = function (indxs) { return indxs.map(function (indx) { return 7 - indx; }); };
// 左右翻
var symMode2 = function (indxs) {
    var newIndxs = new Array(8);
    for (var i = 0; i < 8; i++)
        newIndxs[i] = indxs[7 - i];
    return newIndxs;
};
// 上下 + 左右
var symMode4 = function (indxs) {
    var newIndxs = new Array(8);
    for (var i = 0; i < 8; i++)
        newIndxs[7 - indxs[i]] = i;
    return newIndxs.map(function (indx) { return 7 - indx; });
};
// 全部
var symModes = [symMode0, symMode1, symMode2, symMode4];
exports.default = symModes;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var no = 1;
var createNo = function () {
    var noRoot = document.createElement('DIV');
    noRoot.classList.add('no');
    noRoot.innerHTML = no.toString();
    no++;
    return noRoot;
};
var createSqr = function (black, queen) {
    var sqr = document.createElement('DIV');
    sqr.classList.add('sqr');
    if (black)
        sqr.classList.add('black');
    if (queen)
        sqr.innerHTML = '♛';
    return sqr;
};
var createRow = function (rowIdx, queenIndx) {
    var rowRoot = document.createElement('DIV');
    rowRoot.classList.add('row');
    for (var i = 0; i < 8; i++) {
        var black = (i % 2) === (rowIdx % 2);
        var queen = i === queenIndx;
        var sqr = createSqr(black, queen);
        rowRoot.appendChild(sqr);
    }
    return rowRoot;
};
var createBoard = function (sol) {
    var boardRoot = document.createElement('DIV');
    boardRoot.classList.add('board');
    for (var i = 0; i < 8; i++)
        boardRoot.appendChild(createRow(i, sol[i]));
    return boardRoot;
};
var createTip = function () {
    var indxs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        indxs[_i] = arguments[_i];
    }
    var tip = document.createElement('DIV');
    tip.classList.add('tip');
    tip.innerHTML = "(" + indxs.join(', ') + ")";
    return tip;
};
var createTips = function (sol) {
    var tipsRoot = document.createElement('DIV');
    tipsRoot.classList.add('tips');
    for (var i = 0; i < 8; i++)
        tipsRoot.appendChild(createTip(sol[i], i));
    return tipsRoot;
};
var createBoardSet = function (sol) {
    var boardSet = document.createElement('DIV');
    boardSet.classList.add('board-set');
    boardSet.appendChild(createNo());
    boardSet.appendChild(createBoard(sol));
    boardSet.appendChild(createTips(sol));
    return boardSet;
};
exports.default = createBoardSet;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var header = document.querySelector('header');
var logRoot = document.createElement('DIV');
logRoot.classList.add('log-time');
var logTime = function (timeUsed) {
    logRoot.innerHTML = "Time useed: approx. " + timeUsed + "s";
    header.appendChild(logRoot);
};
exports.default = logTime;


/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map
"use strict";
/*
 * Copyright (c) 2018. 1o1 :{P
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("@reactivex/rxjs");
/**
 * Mixin: Two Objects go in and one Object is returned with all values.
 *
 */
function mergeObjects(x, y) {
    if (typeof x === typeof {}
        && typeof y === typeof {}) {
        for (var _i = 0, _a = Object.keys(x); _i < _a.length; _i++) {
            var key = _a[_i];
            y[key] = x[key];
        }
        return y;
    }
}
exports.mergeObjects = mergeObjects;
/**
 * Hash string.
 * @param {string} dataString
 * @param {string} algo
 * @returns {Promise<string>}
 */
function stringShaHash(dataString, algo) {
    if (algo === void 0) { algo = 'sha-256'; }
    return __awaiter(this, void 0, void 0, function () {
        var buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buffer = new Buffer(dataString, 'utf-8');
                    return [4 /*yield*/, window.crypto.subtle.digest(algo, buffer).toString()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.stringShaHash = stringShaHash;
function counter(mod) {
    var count = mod ? 0 % mod : 0;
    return {
        increment: function (offset) {
            if (offset === void 0) { offset = 0; }
            return count++ + offset;
        },
        decrement: function (offset) {
            if (offset === void 0) { offset = 0; }
            return count-- + offset;
        },
        getCount: count
    };
}
exports.counter = counter;
/**
 * Handy for frameworks that need to load and settle before any Namespace
 * can be called.
 *
 * @param {string} url
 * @returns {<boolean>}
 */
exports.loadDependency$ = function (url) {
    return rxjs_1.Observable.create(function (observer) {
        var node = document.createElement('script');
        node.async = true;
        node.src = url;
        node.onload = function (e) {
            observer.next(e);
        };
        node.onerror = function (e) {
            observer.error(e);
        };
        document.head.appendChild(node);
    });
};
function loadDependency(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var node = document.createElement('script');
                    node.async = true;
                    node.src = url;
                    node.onload = function (e) {
                        resolve(e);
                    };
                    node.onerror = function (e) {
                        reject(e);
                    };
                    document.head.appendChild(node);
                })];
        });
    });
}
exports.loadDependency = loadDependency;
;
function convertToArray(map) {
    var newArray = [];
    for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
        var key = _a[_i];
        newArray = newArray.concat([map[key]]);
    }
    return newArray;
}
exports.convertToArray = convertToArray;
function bufferArrayToBase64(arrayBuffer, format) {
    if (format === void 0) { format = 'audio/mp3'; }
    if (arrayBuffer) {
        var base64Data = "data:" + format + ";base64," + btoa(new Uint8Array(arrayBuffer)
            .reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ''));
        return base64Data;
    }
    else {
        return 'boo';
    }
}
exports.bufferArrayToBase64 = bufferArrayToBase64;
function formatSeconds(seconds) {
    return (Math.trunc(seconds / 60) < 10
        ? '0' + Math.trunc(seconds / 60)
        : Math.trunc(seconds / 60)) + ":" + (Math.trunc(seconds % 60) < 10
        ? '0' + Math.trunc(seconds % 60)
        : Math.trunc(seconds % 60));
}
exports.formatSeconds = formatSeconds;
function ensureVal(arg) {
    if (arg == undefined) {
        return null;
    }
    return arg;
}
exports.ensureVal = ensureVal;
function HEADER_TO_MIME(header) {
    switch (header.slice(0, 6)) {
        case '464f52':
            return 'aif';
        case '494433':
            return 'mp3';
        case '524946':
            return 'wav';
        case '664C61':
            return 'flac';
        case '000001':
            return 'mp4';
        default:
            return 'unknown';
    }
}
exports.HEADER_TO_MIME = HEADER_TO_MIME;

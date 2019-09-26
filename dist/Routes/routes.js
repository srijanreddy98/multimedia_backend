"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../Utils/utils");
var fs = require("fs");
var routes = function (app) {
    var data = JSON.parse(fs.readFileSync(__dirname + '/../../songsData.json').toString());
    var picData = JSON.parse(fs.readFileSync(__dirname + '/../../songsPic.json').toString());
    app.get('/', function (req, res) {
        res.send('BoilerPlate Ping!');
    });
    app.get('/api/songslist', function (req, res) {
        res.send(data.map(function (x) { return { id: x.id, data: x.data }; }));
    });
    app.get('/analyse', function (req, res) {
        utils_1.analyseFolder(req.query.folder);
        res.send("Started");
    });
    app.get('/api/play', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _loop_1, data_1, data_1_1, i, state_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            _loop_1 = function (i) {
                if (i.id == req.query.id) {
                    fs.exists(i.path, function (exists) {
                        if (exists) {
                            var rstream = fs.createReadStream(i.path);
                            rstream.pipe(res);
                        }
                        else {
                            res.send("Its a 404");
                            res.end();
                        }
                    });
                    return "break";
                }
            };
            try {
                // if(req.query.id == -1)
                for (data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    i = data_1_1.value;
                    state_1 = _loop_1(i);
                    if (state_1 === "break")
                        break;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return [2 /*return*/];
        });
    }); });
    app.get('/api/pic', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var picData_1, picData_1_1, i;
        var e_2, _a;
        return __generator(this, function (_b) {
            try {
                for (picData_1 = __values(picData), picData_1_1 = picData_1.next(); !picData_1_1.done; picData_1_1 = picData_1.next()) {
                    i = picData_1_1.value;
                    if (i.id == req.query.id) {
                        res.send(i.picture);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (picData_1_1 && !picData_1_1.done && (_a = picData_1.return)) _a.call(picData_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return [2 /*return*/];
        });
    }); });
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map
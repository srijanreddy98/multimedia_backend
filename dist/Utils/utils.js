"use strict";
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
var mm = require("music-metadata");
var rr = require("recursive-readdir");
var analyseFolder = function (folderPath) {
    var acceptedFiles = ["mp3", "wav"];
    var ignoreFunc = function (file, stats) {
        return stats.isDirectory() || acceptedFiles.indexOf(file.split('.')[file.split('.').length - 1]) === -1;
    };
    rr(folderPath, [ignoreFunc]).then(function (files) {
        var e_1, _a;
        try {
            for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var file = files_1_1.value;
                mm.parseFile(file).then(function (a) { return console.log(a); }, function (err) { return console.log(err); });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }, function (err) { return console.log(err); });
};
exports.analyseFolder = analyseFolder;
//# sourceMappingURL=utils.js.map
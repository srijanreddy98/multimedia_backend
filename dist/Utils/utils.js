"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mm = require("music-metadata");
var rr = require("recursive-readdir");
var fs_1 = require("fs");
var analyseFolder = function (folderPath) {
    console.log(folderPath);
    var acceptedFiles = ["mp3", "wav"];
    var ignoreFunc = function (file, stats) {
        console.log(file);
        return acceptedFiles.indexOf(file.split('.')[file.split('.').length - 1]) === -1;
    };
    var getData = function (id, file, len) {
        mm.parseFile(file).then(function (metadata) {
            if (metadata.common.picture) {
                songsPic.push({ id: id, picture: metadata.common.picture });
            }
            else {
                songsPic.push({ id: id, picture: undefined });
            }
            delete metadata.common.picture;
            console.log(metadata.format);
            songsData.push({ id: id, data: metadata.common, path: file, format: metadata.format.codec });
            total += 1;
            console.log(id + " done of " + len);
            if (total === len) {
                fs_1.writeFileSync('songsData.json', JSON.stringify(songsData));
                fs_1.writeFileSync('songsPic.json', JSON.stringify(songsPic));
            }
        }, function (err) { return console.log(err); });
    };
    var total = 0;
    var songsData = [];
    var songsPic = [];
    rr(folderPath, [ignoreFunc]).then(function (files) {
        var len = files.length;
        for (var i in files)
            getData(i, files[i], len);
    }, function (err) { return console.log(err); });
};
exports.analyseFolder = analyseFolder;
//# sourceMappingURL=utils.js.map
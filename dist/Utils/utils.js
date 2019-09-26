"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mm = require("music-metadata");
var rr = require("recursive-readdir");
var fs_1 = require("fs");
var analyseFolder = function (folderPath) {
    console.log(folderPath);
    var acceptedFiles = ["mp3", "wav"];
    var ignoreFunc = function (file, stats) {
        if (stats.isDirectory())
            return false;
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
            songsData.push({ id: id, data: metadata.common, path: file, format: metadata.format.codec });
            total += 1;
            console.log("total: " + total + ", " + id + " done of " + len);
            if (total === len) {
                fs_1.writeFileSync('songsData.json', JSON.stringify(songsData));
                fs_1.writeFileSync('songsPic.json', JSON.stringify(songsPic));
            }
        }, function (err) { return console.log(err); });
    };
    var total = 0;
    var songsData = [];
    var songsPic = [];
    rr('/Users/Chintu/Music', [ignoreFunc]).then(function (files) {
        console.log(files.length);
        // for (let i of files) {
        //     recur(i, files.length);
        // }
    }, function (error) {
        console.error("something exploded", error);
    });
    // rr(folderPath, [ignoreFunc]).then(
    //     files => {
    //         const len = files.length;
    //         for (let i in files) getData(i, files[i], len);
    //     },
    //     err => console.log(err)
    // );
};
exports.analyseFolder = analyseFolder;
//# sourceMappingURL=utils.js.map
import * as mm from 'music-metadata';
import * as rr from 'recursive-readdir';
import { writeFileSync } from 'fs';
let analyseFolder = (folderPath) => {
    console.log(folderPath)
    let acceptedFiles = ["mp3", "wav"];
    let ignoreFunc = (file, stats) => {
        if (stats.isDirectory()) return false;
        return acceptedFiles.indexOf(file.split('.')[file.split('.').length - 1]) === -1;
    }
    let getData = (id, file, len) => {
        mm.parseFile(file).then(
            metadata => {
                if (metadata.common.picture) {
                    songsPic.push({id: id, picture: metadata.common.picture});
                } else {
                    songsPic.push({id: id, picture: undefined});
                }
                delete metadata.common.picture;
                songsData.push({id: id, data: metadata.common, path: file, format: metadata.format.codec});
                total += 1;
                console.log(`total: ${total}, ${id} done of ${len}`);
                if (total === len) {
                    writeFileSync('songsData.json', JSON.stringify(songsData));
                    writeFileSync('songsPic.json', JSON.stringify(songsPic));
                }
            },
            err => console.log(err)
        )
    }
    let total  = 0
    let songsData = [];
    let songsPic = [];
    rr('/Users/Chintu/Music', [ignoreFunc]).then(
        function (files) {
            console.log(files.length);
            // for (let i of files) {
            //     recur(i, files.length);
            // }
        },
        function (error) {
            console.error("something exploded", error);
        }
    );
    // rr(folderPath, [ignoreFunc]).then(
    //     files => {
    //         const len = files.length;
    //         for (let i in files) getData(i, files[i], len);
    //     },
    //     err => console.log(err)
    // );

}

export {analyseFolder}
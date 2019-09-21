import * as mm from 'music-metadata';
import * as rr from 'recursive-readdir';
let analyseFolder = (folderPath) => {
    let acceptedFiles = ["mp3", "wav"];
    let ignoreFunc = (file, stats) => {
        return stats.isDirectory() || acceptedFiles.indexOf(file.split('.')[file.split('.').length - 1]) === -1;
    }
    
    rr(folderPath, [ignoreFunc]).then(
        files => {
            for (let file of files) {
                mm.parseFile(file).then(
                    a => console.log(a),
                    err => console.log(err)
                )
            }
        },
        err => console.log(err)
    );

}

export {analyseFolder}
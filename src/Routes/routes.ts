import { analyseFolder } from '../Utils/utils';
import * as fs from 'fs';
let routes = (app) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/../../songsData.json').toString());
    let picData = JSON.parse(fs.readFileSync(__dirname+ '/../../songsPic.json').toString());
    app.get('/', (req, res) => {
        res.send('BoilerPlate Ping!');
    });

    app.get('/api/songslist', (req, res) => {
        res.send(data.map((x) => { return { id: x.id, data: x.data }}));
    });

    app.get('/analyse', (req, res) => {
        analyseFolder('C:\\Users\\Chintu\\Music');
        res.send("Started")
    });
    app.get('/api/play', async (req, res) => {
        // if(req.query.id == -1)
        for (let i of data) {
            if (i.id == req.query.id) {
                fs.exists(i.path, function (exists) {
                    if (exists) {
                        var rstream = fs.createReadStream(i.path);
                        rstream.pipe(res);
                    } else {
                        res.send("Its a 404");
                        res.end();
                    }
                });
                break;
            }
        }
    });
    app.get('/api/pic', async (req, res) => {
        for (let i of picData) {
            if (i.id == req.query.id) {
                res.send(i.picture);
            }
        }
    })
 }

export {routes};
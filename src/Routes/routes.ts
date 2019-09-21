import { analyseFolder } from '../Utils/utils';
import * as fs from 'fs';
let routes = (app) => {
    app.get('/', (req, res) => {
        res.send('BoilerPlate Ping!');
    });

    app.get('/api/songslist', (req, res) => {
        res.send(JSON.parse(fs.readFileSync(__dirname + '/../../songsData.json')));
    });

    app.get('/analyse', (req, res) => {
        analyseFolder('/Users/srijan/Desktop/Music/BillBoard 30 Apr 2014');
        res.send("Started")
    })
 }

export {routes};
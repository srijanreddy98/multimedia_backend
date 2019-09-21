import { analyseFolder } from '../Utils/utils';
let routes = (app) => {
    app.get('/', (req, res) => {
        res.send('BoilerPlate Ping!');
    });

    app.get('/analyse', (req, res) => {
        analyseFolder('/Users/srijan/Desktop/exp');
        res.send("Started")
    })
 }

export {routes};
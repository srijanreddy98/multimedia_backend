"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../Utils/utils");
var fs = require("fs");
var routes = function (app) {
    app.get('/', function (req, res) {
        res.send('BoilerPlate Ping!');
    });
    app.get('/api/songslist', function (req, res) {
        res.send(JSON.parse(fs.readFileSync(__dirname + '/../../songsData.json')));
    });
    app.get('/analyse', function (req, res) {
        utils_1.analyseFolder('/Users/srijan/Desktop/Music/BillBoard 30 Apr 2014');
        res.send("Started");
    });
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../Utils/utils");
var routes = function (app) {
    app.get('/', function (req, res) {
        res.send('BoilerPlate Ping!');
    });
    app.get('/analyse', function (req, res) {
        utils_1.analyseFolder('/Users/srijan/Desktop/exp');
        res.send("Started");
    });
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map
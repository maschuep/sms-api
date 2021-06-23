"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const dotenv = __importStar(require("dotenv"));
const sms_controller_1 = require("./controllers/sms.controller");
const server_service_1 = require("./services/server.service");
class Server {
    constructor() {
        dotenv.config();
        this._port = Number.parseInt(process.env.PORT, 10) || 3001;
        this._server = new server_service_1.ServerService([new sms_controller_1.SmsController()]);
        this._server.listen(this._port, () => console.log(`server listening at http://localhost:${this._port}`));
    }
}
exports.Server = Server;
const server = new Server();
//# sourceMappingURL=server.js.map
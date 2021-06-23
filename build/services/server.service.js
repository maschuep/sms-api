"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerService = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class ServerService {
    constructor(controllers) {
        this._express = express_1.default()
            .use(express_1.default.json())
            .use(morgan_1.default('tiny'))
            .use(cors_1.default({ origin: '*', allowedHeaders: '*' }));
        if (controllers) {
            this.use(controllers);
        }
    }
    use(controllers) {
        this._express.get('/', (req, res) => {
            res.status(200).send('<h1>SMS API is working <span style="font-size:50px">&#127881;</span></h1>');
        });
        controllers
            .map(c => c.getPathAndRouter())
            .forEach(r => this._express.use(r.path, r.controller));
    }
    listen(port, callback) {
        this._express.listen(port, callback);
    }
}
exports.ServerService = ServerService;
//# sourceMappingURL=server.service.js.map
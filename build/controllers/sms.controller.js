"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsController = void 0;
const express_1 = __importDefault(require("express"));
const serialport_1 = __importDefault(require("serialport"));
class SmsController {
    constructor() {
        this._delay = 1000;
        this._router = express_1.default.Router();
        this._path = '/sms';
        this._serialCommander = new serialport_1.default('/dev/serial0', {
            baudRate: 115200,
        });
        this.sendSms();
    }
    sendSms() {
        this._router.get('/send', (req, res) => {
            console.log('sending AT');
            const commands = [
                'AT',
                'AT+CMGF=1',
                'AT+CSMP=17,167,0,144',
                'AT+CMGS="0786447590"',
                'HohesC',
                Buffer.from([0x1A])
            ];
            this.writeQueue(commands);
            this._serialCommander.on('readable', (data) => {
                var _a;
                console.log('modem: ', (_a = this._serialCommander.read()) === null || _a === void 0 ? void 0 : _a.toString('utf-8'));
            });
        });
    }
    writeQueue(queue) {
        queue.forEach(cmd => {
            setTimeout(() => this._serialCommander.write(cmd), this._delay);
        });
    }
    getPathAndRouter() {
        return { path: this._path, controller: this._router };
    }
}
exports.SmsController = SmsController;
//# sourceMappingURL=sms.controller.js.map
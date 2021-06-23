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
            this._serialCommander.write('AT\n', (err) => { console.log('sent AT'); res.status(200).send({ error: err }); });
            this._serialCommander.write('AT+CMGF=1\n');
            this._serialCommander.write('AT+CSMP=17,167,0,144\n');
            this._serialCommander.write('AT+CMGS="0786447590"\n');
            this._serialCommander.write('HalloWelt');
            setTimeout(() => {
                this._serialCommander.write('0x1A', 'hex', (err) => { console.log('ERROR:', err); });
                this._serialCommander.write('\n');
            }, 100);
            this._serialCommander.on('readable', (data) => {
                console.log('modem: ', this._serialCommander.read().toString());
            });
        });
    }
    getPathAndRouter() {
        return { path: this._path, controller: this._router };
    }
}
exports.SmsController = SmsController;
//# sourceMappingURL=sms.controller.js.map
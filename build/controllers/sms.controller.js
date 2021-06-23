"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this._serialPort = new serialport_1.default('/dev/serial0', {
            autoOpen: false,
            baudRate: 115200,
            dataBits: 8,
            parity: 'none',
            stopBits: 1,
            xon: false,
            rtscts: false,
            xoff: false,
            xany: false
        }, (err) => { if (err) {
            console.log(err);
        } });
        this.sendSms();
    }
    sendSms() {
        this._router.get('/send', (req, res) => {
            console.log('sending AT');
            this._serialPort.on('open', () => __awaiter(this, void 0, void 0, function* () {
                this._serialPort.write('AT\n');
                yield this.sleep(this._delay);
                this._serialPort.write('AT+CMGF=1\n');
                yield this.sleep(this._delay);
                this._serialPort.write('AT+CSMP=17,167,0,144\n');
                yield this.sleep(this._delay);
                this._serialPort.write('AT+CMGS="0786447590"\n');
                yield this.sleep(this._delay);
                this._serialPort.write('HohesC');
                yield this.sleep(this._delay);
                this._serialPort.write('\x1A');
                this._serialPort.drain((err) => console.log(err));
                res.status(200).send('working?');
            }));
            this._serialPort.on('data', function (data) {
                console.log('Received data: ' + data);
            });
            this._serialPort.on('readable', (data) => {
                var _a;
                console.log('Modem reads: ', (_a = this._serialPort.read()) === null || _a === void 0 ? void 0 : _a.toString('utf-8'));
            });
            this._serialPort.open((err) => { if (err) {
                console.log('could not open port: ', err);
            } });
        });
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    writeQueue(queue) {
        queue.forEach(cmd => {
            setTimeout(() => this._serialPort.write(cmd), this._delay);
        });
    }
    getPathAndRouter() {
        return { path: this._path, controller: this._router };
    }
}
exports.SmsController = SmsController;
//# sourceMappingURL=sms.controller.js.map
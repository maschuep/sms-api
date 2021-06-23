"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsController = void 0;
const express_1 = __importDefault(require("express"));
class SmsController {
    constructor() {
        this._router = express_1.default.Router();
        this._path = '/sms';
        this._modem = require('serialport-gsm').Modem();
        this._options = {
            baudRate: 115200,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
            rtscts: false,
            xon: false,
            xoff: false,
            xany: false,
            autoDeleteOnReceive: true,
            enableConcatenation: true,
            incomingCallIndication: true,
            incomingSMSIndication: true,
            pin: '',
            customInitCommand: '',
            logger: console,
        };
        this._modem.on('open', (data) => {
            this._modem.initializeModem((err) => {
                if (err) {
                    console.log('error1?:', err);
                }
            });
        });
        this._modem.open('/dev/serial0', this._options, (err) => {
            if (err) {
                console.log('error2?:', err);
            }
        });
        this.testGSMSms();
        this.sendSms();
    }
    testGSMSms() {
        this._router.get('/test', (req, res) => {
            this._modem.sendSMS('0786447590', `funktioniert: ${new Date().toLocaleString()}`, false, (answ) => {
                if (answ.status === 'success') {
                    res.status(200).send();
                }
                else {
                    res.status(500).send(answ);
                }
            });
            res.status(200).send();
        });
    }
    sendSms() {
        this._router.post('/send', (req, res) => {
            this._modem.sendSMS(`${req.body.number}`, `${req.body.message}`, req.body.flash, (answ) => {
                if (answ.status === 'success') {
                    res.status(200).send();
                }
                else {
                    res.status(500).send({ error: answ });
                }
            });
        });
    }
    getPathAndRouter() {
        return { path: this._path, controller: this._router };
    }
}
exports.SmsController = SmsController;
//# sourceMappingURL=sms.controller.js.map
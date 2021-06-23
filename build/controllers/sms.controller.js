"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsController = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../middlewares/checkAuth");
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
        this._modem.on('open', () => {
            this._modem.initializeModem((answ) => {
                if (answ.status !== 'success') {
                    console.log('init error:', answ);
                }
            });
        });
        this._modem.open('/dev/serial0', this._options, (answ) => {
            if (answ.status !== 'success') {
                console.log('starting up error:', answ);
            }
        });
        this.testSms();
        this.sendSms();
    }
    testSms() {
        this._router.get('/test', (req, res) => {
            this._modem.sendSMS('0786447590', `funktioniert: ${new Date().toLocaleString()}`, true, (answ) => {
                if (answ.status === 'success') {
                    try {
                        res.status(200).send();
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                else {
                    console.log('Error: ', answ);
                }
            });
        });
    }
    sendSms() {
        this._router.post('/send', checkAuth_1.verifyToken, (req, res) => {
            this._modem.sendSMS(`${req.body.number}`, `${req.body.message}`, req.body.flash, (answ) => {
                if (answ.status === 'success') {
                    try {
                        res.status(200).send();
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                else {
                    console.log('Error: ', answ);
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
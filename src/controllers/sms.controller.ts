import express, { Router, Request, Response } from 'express';
import { send } from 'process';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import { ControllersObject } from '../interfaces/controllers-object.interface';


export class SmsController implements ControllerFactory {

    _router: Router;
    _path: string;
    _modem: any;
    _options: any;
    _modemOpen: boolean;

    constructor() {
        this._router = express.Router();
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
            this._modem.initializeModem((answ: any) => {
                if (answ.status !== 'success') {
                    console.log('error1?:', answ);
                }
            });

        });
        this._modem.open('/dev/serial0', this._options, (answ: any) => {
            if (answ.status !== 'success') {
                console.log('starting up:', answ);
            }
        });
        this.testGSMSms();
        this.sendSms();
    }

    testGSMSms() {
        this._router.get('/test', (req: Request, res: Response) => {
            this._modem.sendSMS('0786447590', `funktioniert: ${new Date().toLocaleString()}`, true, (answ: any) => {
                if (answ.status === 'success') {
                    try {
                        res.status(200).send();
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                   console.log('Error: ', answ);
                }
            });
        });
    }

    sendSms() {
        this._router.post('/send', (req: Request, res: Response) => {
            this._modem.sendSMS(`${req.body.number}`, `${req.body.message}`, req.body.flash, (answ: any) => {
               if (answ.status === 'success') {
                try {
                    res.status(200).send();
                } catch (err) {
                    console.log(err);
                }
               } else {
                   console.log('Error: ', answ);
               }
            });

        });
    }

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }
}

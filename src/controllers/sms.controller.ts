import express, { Router, Request, Response } from 'express';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import { ControllersObject } from '../interfaces/controllers-object.interface';


export class SmsController implements ControllerFactory {

    _router: Router;
    _path: string;
    _modem: any;
    _options: any;

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
        this.testGSMSms();
    }

    testGSMSms() {
        this._router.get('/gsm', (req: Request, res: Response) => {



            this._modem.on('open', (data: any) => {
                this._modem.initializeModem((err: any) => {
                    if (err) {
                        console.log('error1?:', err);
                    }
                });
                this._modem.sendSMS('0786447590', `funktioniert: ${new Date().toLocaleString()}`, false, (err: any) => {
                    if (err) {
                        console.log('sent?:', err);
                    }
                });
            });
            this._modem.open('/dev/serial0', this._options, (err: any) => {
                if (err) {
                    console.log('error2?:', err);
                }
            });

            res.status(200).send('gsm works');
        });
    }

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }
}

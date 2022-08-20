import express, { Router, Request, Response } from 'express';
import { send } from 'process';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import { ControllersObject } from '../interfaces/controllers-object.interface';
import { verifyToken } from '../middlewares/checkAuth';


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
                    console.log('init error:', answ);
                }
            });

        });
        this._modem.open('/dev/serial0', this._options, (answ: any) => {
            if (answ.status !== 'success') {
                console.log('starting up error:', answ);
            }
        });
        this.testSms();
        this.sendSms();
    }

    testSms() {
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

    /* core part of the sms api, this is the interface between the controller that listens on the path 'send' and the serial port, which controls the 4G HAT that sends
     * the sms 
     */
    sendSms() {
        // listens on the url '{root}/send' verifies the request on this path is allowed 
        this._router.post('/send', verifyToken, (req: Request, res: Response) => {
            //send sms to number in the request with messag from the request, the flash flag says wheter it should be a flash sms or not
            this._modem.sendSMS(`${req.body.number}`, `${req.body.message}`, req.body.flash, (answ: any) => {
               // reply with statuscode 200
               if (answ.status === 'success') {
                try {
                    res.status(200).send();
                } catch (err) {
                    console.log(err);
                }
               // log a response
               } else {
                   console.log('Error: ', answ);
               }   
               res.status(500).send();
            });

        });
    }

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }
}

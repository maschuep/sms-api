import express, { Router, Request, Response } from 'express';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import { ControllersObject } from '../interfaces/controllers-object.interface';
import SerialPort from 'serialport';


export class SmsController implements ControllerFactory {

    _router: Router;
    _path: string;
    _serialCommander;

    constructor() {
        this._router = express.Router();
        this._path = '/sms';
        this._serialCommander = new SerialPort('/dev/serial0', {
            baudRate: 115200,

        });

        this.sendSms();
    }

    sendSms() {
        this._router.get('/send', (req: Request, res: Response) => {
            console.log('sending AT');
            this._serialCommander.write('AT\n', (err: Error) => { console.log('sent AT'); res.status(200).send({ error: err }); });
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

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }

}

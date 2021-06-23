import express, { Router, Request, Response } from 'express';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import { ControllersObject } from '../interfaces/controllers-object.interface';
import SerialPort from 'serialport';
import { isString } from 'util';


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
            this._serialCommander.write('HalloWelt\u001a');
            this._serialCommander.on('readable', (data) => {
                console.log('modem: ', this.convertToString(this._serialCommander.read()));
            });

        });
    }

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }

    convertToString(data: string | Buffer): string {
        if (typeof data === 'string') {
            return data;
        }
       return data.toString('utf-8');
    }

}

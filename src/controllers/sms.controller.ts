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
            this._serialCommander.write('AT', (str: Error) => {console.log('sent AT'); res.status(200).send(str); });
            this._serialCommander.on('data', (data) => {
                console.log('modem: ', data)
              })
              
        });
    }

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }

}

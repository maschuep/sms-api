import express, { Router, Request, Response } from 'express';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import { ControllersObject } from '../interfaces/controllers-object.interface';
import * as serial from '@westh/serial-commander';

export class SmsController implements ControllerFactory {

    _router: Router;
    _path: string;
    _serialCommander;

    constructor() {
        this._router = express.Router();
        this._path = '/sms';
        this._serialCommander = new serial.SerialCommander({
            port: '/dev/serial0',
            baudrate: '115200',
            delimiter: '/n',
            disableLog: false,
            defaultDelay: 50,
            log: (str: string) => console.log(`[${new Date().toLocaleString()}] ${str}`)
        });

        this.sendSms();
    }

    sendSms() {
        this._router.get('/send', (req: Request, res: Response) => {
            console.log('sending AT')
            this._serialCommander.send('AT').then((str: string) => {console.log('sent AT');res.status(200).send(str)});
        });
    }

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }

}

import express, { Router, Request, Response } from 'express';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import { ControllersObject } from '../interfaces/controllers-object.interface';
import SerialPort from 'serialport';
import { isString } from 'util';


export class SmsController implements ControllerFactory {

    _router: Router;
    _path: string;
    _serialCommander;

    private _delay = 100;

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
            const commands = [
                'AT',
                'AT+CMGF=1',
                'AT+CSMP=17,167,0,144',
                'AT+CMGS="0786447590"',
                'HohesC',
                Buffer.from([0x1A])
            ];
            this.writeQueue(commands);
            this._serialCommander.on('readable', (data) => {
                console.log('modem: ', this._serialCommander.read()?.toString('utf-8'));
            });

        });
    }

    writeQueue(queue: (string | Buffer)[]) {
        queue.forEach(cmd => {
            setTimeout(() => this._serialCommander.write(cmd), this._delay);

        });
    }

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }
}

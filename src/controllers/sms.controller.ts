import express, { Router, Request, Response } from 'express';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import { ControllersObject } from '../interfaces/controllers-object.interface';
import SerialPort from 'serialport';


export class SmsController implements ControllerFactory {

    _router: Router;
    _path: string;
    _serialPort;

    private _delay = 1000;

    constructor() {
        this._router = express.Router();
        this._path = '/sms';
        this._serialPort = new SerialPort('/dev/serial0', {
            autoOpen: false,
            baudRate: 115200,
            dataBits: 8,
            parity: 'none',
            stopBits: 1,
            xon: false,
            rtscts: false,
            xoff: false,
            xany: false
        }, (err) => { if (err) { console.log('err', err); } });

        this.sendSms();
        this.sendGSMSms();
    }

    sendGSMSms() {
        this._router.get('/gsm', (req: Request, res: Response) => {
            const serialportgsm = require('serialport-gsm');
            const modem = serialportgsm.Modem();
            const options = {
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
            modem.on('open', (data: any) => {
                modem.initializeModem((err: any) => {
                    if (err) {
                        console.log('error1?:', err);
                    }
                });
                modem.sendSMS('0786447590', 'welche klasse?', false, (err: any) => {
                    if (err) {
                        console.log('sent?:', err);
                    }
                });
            });
            modem.open('/dev/serial0', options, (err: any) => {
                if (err) {
                    console.log('error2?:', err);
                }
            });

            res.status(200).send('gsm works?');
        });
    }
    sendSms() {
        this._router.get('/send', (req: Request, res: Response) => {
            console.log('sending AT');
            this._serialPort.on('open', async () => {
                this._serialPort.write('AT\n');
                await this.sleep(this._delay);
                this._serialPort.write('AT+CMGF=1\n');
                await this.sleep(this._delay);
                this._serialPort.write('AT+CSMP=17,167,0,144\n');
                await this.sleep(this._delay);
                this._serialPort.write('AT+CMGS="0786447590"\n');
                await this.sleep(this._delay);
                this._serialPort.write('HohesC\n');
                await this.sleep(this._delay);
                this._serialPort.write('\x1A');
                this._serialPort.drain((err) => console.log(err));
                res.status(200).send('working?');
            });
            this._serialPort.on('data', function (data) {
                console.log('Received data: ' + data);
            });
            this._serialPort.open((err) => { if (err) { console.log('could not open port: ', err); } });

        });
    }

    sleep(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    writeQueue(queue: string[]) {
        queue.forEach(cmd => {
            setTimeout(() => this._serialPort.write(cmd), this._delay);

        });
    }

    getPathAndRouter(): ControllersObject {
        return { path: this._path, controller: this._router };
    }
}

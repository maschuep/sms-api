import express, { Router, Request, Response } from "express";
import { ControllerFactory } from "../interfaces/controller-factory.interface";
import { ControllersObject } from "../interfaces/controllers-object.interface";

export class SmsController implements ControllerFactory{

    _router: Router;
    _path: string;

    constructor(){
        this._router = express.Router();
        this._path = '/sms';
        this.sendSms();
    }

    sendSms(){
        this._router.get('/send', (req: Request, res: Response) => {
            res.status(200).send({message:'Hallo Welt'})
        })
    }

    getPathAndRouter(): ControllersObject {
       return {path: this._path, controller: this._router}
    }

}
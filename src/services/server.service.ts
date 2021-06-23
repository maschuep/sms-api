import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { ControllerFactory } from '../interfaces/controller-factory.interface';
import cors from 'cors';

export class ServerService {

    private _express: Application;

    constructor(controllers: ControllerFactory[]) {
        this._express = express()
            .use(express.json())
            .use(morgan('tiny'))
            .use(cors({origin: '*', allowedHeaders: '*'}));
        if (controllers) { this.use(controllers); }
    }

    public use(controllers: ControllerFactory[]) {
        this._express.get('/', (req: Request, res: Response) => {
            res.status(200).send('<h1>SMS API is working <span style="font-size:50px">&#127881;</span></h1>');
        });
        controllers
            .map(c => c.getPathAndRouter())
            .forEach(r => this._express.use(r.path, r.controller));
    }

    public listen(port: number, callback?: () => void) {
        this._express.listen(port, callback);
    }

}

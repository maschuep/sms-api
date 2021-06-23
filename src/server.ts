import * as dotenv from 'dotenv';
import {SmsController} from './controllers/sms.controller';
import { ServerService } from './services/server.service';
import jwt from 'jsonwebtoken';

export class Server {

    private _server: ServerService;
    private _port: number;

    constructor() {

        dotenv.config();

       const createToken: boolean = process.env.CREATE_TOKEN === 'true';
        if (createToken) {
            this.printToken();
        }

        this._port = Number.parseInt(process.env.PORT, 10) || 3001;

        this._server = new ServerService([new SmsController()]);

        this._server.listen(this._port, () => console.log(`server listening at http://localhost:${this._port}`));
    }

    printToken() {
        const secret = process.env.JWT_SECRET;
        console.log(jwt.sign({date: new Date().toLocaleString()}, secret, {expiresIn: '200d'}));
    }
}

const server = new Server();

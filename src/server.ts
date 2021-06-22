import * as dotenv from 'dotenv';
import {SmsController} from './controllers/sms.controller';
import { ServerService } from './services/server.service';

export class Server {

    private _server: ServerService;
    private _port: number;

    constructor() {

        dotenv.config();

        this._port = Number.parseInt(process.env.PORT, 10) || 3001;

        this._server = new ServerService([new SmsController()]);

        this._server.listen(this._port, () => console.log(`server listening at http://localhost:${this._port}`));
    }
}

const server = new Server();

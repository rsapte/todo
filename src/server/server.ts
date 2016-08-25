import * as Express from 'express';
import * as Http from 'http';
import { TodoController } from './controllers/todo';

interface IAppServerConfig {
    port: number;
}

class AppServer {
    private _config: IAppServerConfig;
    private _server: Http.Server;

    constructor(config: IAppServerConfig) {
        this._config = config;

        let app = Express();
        this._configureApp(app);

        this._server = Http.createServer(app);
    }

    public start() {
        let port = this._config.port;
        this._server.listen(port, function() {
            console.log(`Server is running at port ${port}`);
        });
    }

    private _configureApp(app: Express.Application) {
        let controllers = [
            new TodoController()
        ];

        for(let controller of controllers) {
            controller.registerRoutes(app);
        }
    }
}

let server = new AppServer({ port: 3000 });
server.start();
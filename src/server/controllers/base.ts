import * as Express from 'express';

export abstract class ControllerBase {
    protected registerRoute(
        app: Express.Application, 
        path: string, 
        handler: Express.RequestHandler, 
        method: string = 'GET') {
            let fullPath = '/apis/' + path;
            app.use(fullPath, function(req, res, next) {
                if(req.method.toLowerCase() === method.toLowerCase()) {
                    handler(req, res);
                }
                next();
            });
    }

    public abstract registerRoutes(app: Express.Application);
}
import * as Express from 'express';

export abstract class ControllerBase {
    protected registerRoute(
        app: Express.Application, 
        path: string, 
        getHandler?: Express.RequestHandler, 
        postHandler?: Express.RequestHandler) {
            let fullPath = '/apis/' + path;
            if(getHandler) {
                app.get(fullPath, getHandler);
            }

            if(postHandler) {
                app.post(fullPath, postHandler);
            }
    }

    public abstract registerRoutes(app: Express.Application);
}
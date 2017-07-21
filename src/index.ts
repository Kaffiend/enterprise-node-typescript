import * as express from 'express';
import * as http from 'http';
import { Server } from 'http';
import * as bodyParser from 'body-parser';
import TYPES from './types';
import container from './inversify.config';
import {logger} from './util/Logger';
import {RegistrableController} from './controller/RegisterableController';
import { RegisterableSocket } from './socket/RegisterableSocket';
import * as io from 'socket.io';

// create express application
const app: express.Application = express();
const httpServer: Server = http.createServer(app);
const socketServer: SocketIO.Server = io.listen(httpServer);
// let express support JSON bodies
app.use(bodyParser.json());

// grabs the Controller from IoC container and registers all the endpoints
const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

const sockets: RegisterableSocket[] = container.getAll<RegisterableSocket>(TYPES.Socket);
sockets.forEach(socket => socket.register(socketServer));

// setup express middleware logging and error handling
app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    logger.error(err.stack);
    next(err);
});

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send('Internal Server Error');
});

app.listen(3000, function () {
    console.info('Example app listening on port 3000!');
});

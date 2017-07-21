import { RegisterableSocket } from './RegisterableSocket';
import {injectable, inject} from 'inversify';

@injectable()
export class ConfigSocket implements RegisterableSocket {

    private socket: SocketIO.Socket;
    /**
     * TODO: Add Socket repositories to IoC Container to be constructor injected.
     */
    public register(io: SocketIO.Server) {
        console.log('registering socket');
        /**
         * Setup with namespacing.
         */
    }
}

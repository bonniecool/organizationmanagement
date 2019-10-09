import RethinkWebSocketClient from 'rethinkdb-websocket-client';
import { rethink } from "../config/app";
// import Promise from 'promise';

const SocketService = () => {
    const { port, host, db } = rethink;

    return RethinkWebSocketClient.connect({
        host,
        port,
        db,
        path: '/db',
        secure: false,
        autoReconnectDelayMs: 2000
    })
}

export const rethinkDb = () => {
    return RethinkWebSocketClient.rethinkdb;
}

export const wait = (socket, table) => {
    return socket.then(
        conn => {
            
        }
    )
}

export default SocketService;
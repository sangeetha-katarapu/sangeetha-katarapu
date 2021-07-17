import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';

import store from './serverConfig'

const { consoleLog, serverLog } = require('./logs/createLogger')
var passport = require('passport')

// routes
import commonRoutes from './routes/commonRoutes';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || store.sessionInfo.serverPort);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({ extended: false ,limit: '50mb'}));

        this.app.use(passport.initialize());

        this.app.use(session({
            secret: store.sessionInfo.sessionKey,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: store.sessionInfo.maxAge }
        }));
    }

    routes(): void {
        this.app.use('/api/common', commonRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            consoleLog.info('Server on port ', this.app.get('port'))
        })
    }
}

const server = new Server();
server.start();
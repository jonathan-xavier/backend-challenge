import express from 'express';
import routes from './routes';
//arquivo que carrega a conexão nos models.
import './database/index';
class App {
  constructor(){
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }
}

export default new App().server;
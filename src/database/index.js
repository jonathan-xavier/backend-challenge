//conexão com o banco e carrega nos models
import Sequelize from 'sequelize';
import User from '../app/models/User';
import databaseConfig from '../config/database';
import Summoner from '../app/models/Summoner';

//criando array com os models da aplicação.
const models = [User,Summoner];


class Database {
  constructor(){
    this.init();
  }

  init(){
    //conexão com o meu banco de dados.
    this.connection = new Sequelize(databaseConfig);
    //percorrendo o array de models e passando a conexão
    //no parametro estatico da classe.
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));

  }

}

export default new Database();
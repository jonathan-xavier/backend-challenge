module.exports ={

  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '123456',
  database:'ritogomes',
  define:{
    timestamps: true, //createdAt e updatedAt
    underscored: true, //cria tabelas com "_" ao inves de camelCase.
    underscoredAll: true  // cria as colunas e relacionamentos com o "_" ao inves do camelCase.
  }
}
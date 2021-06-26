import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';


class User extends Model {
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      // Esse campo nunca vai existir na base de dados, só serve para poder 
      // criptografar a senha
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,

    },
    {
      sequelize,
      
    }); 
    //antes de salvar o usuario vai
    // criptografar o password e atrelar ao password_hash.
    this.addHook('beforeSave',async (user)=>{
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }
    //metodo para verificar se as senhas correspondem na auteticação(SessionController).
    checkPassword(password){
      return bcrypt.compare(password, this.password_hash);
    }

}

export default User;
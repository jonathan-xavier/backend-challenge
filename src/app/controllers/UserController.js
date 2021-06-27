import User from '../models/User';

class UserController {


  async store(req,res){
    const userEmail = await User.findOne({where: {email: req.body.email}});

    if(userEmail){
      return res.status(400).json({error: 'Usuário já existe!'});
    }
    //passando apenas valores importantes como resposta.
    const {id, name, email} = await User.create(req.body);
    return res.json({
      id,
      name,
      email
    });
  }
  async index(req,res){
    const users = await User.findAll();
    return res.json({users})
  }
  async update(req,res){
    
    const {email, oldPassword} = req.body;

    //verificando se o email que o usuário está mudando já não existe
    //por que o email tem que ser unico.
    const user = await User.findByPk(req.userId);
    if(email !== user.email){
      const userEmail = await User.findOne({where: {email: email}}); 

      if(userEmail){
        return res.status(400).json({error: 'Usuário já existe!'});
      }
    }
    //verificando se o oldPassword bate com a senha que ele ja tem.
    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({error: 'Senha incorreta!'});
    } 

    const {id,name} = await user.update(req.body);


    return res.json({
      id,
      name,
      email,
    });
  }
  delete(){}


}

export default new UserController();
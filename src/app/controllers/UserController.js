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
  index(){

  }
  update(){

  }
  delete(){}


}

export default new UserController();
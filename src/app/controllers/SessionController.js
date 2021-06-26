import jwt from 'jsonwebtoken';
import User from '../models/User';


class SessionController{
  async store(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({where:{ email: email}});
    if(!user){
      return res.status(401).json({ erro: 'Usuário não encontrado!'});

    }
    if(!await user.checkPassword(password)){
      return res.status(401).json({erro: 'Senha incorreta!'});
    }

    const { id, name } = user;

    return res.json({
      user:{
        id,
        name,
        email
      },
      token: jwt.sign({ id },'76cf1a082e33db14074a8fd69818f92b', {
        expiresIn: '24h',
      })
    })
  }



}

export default new SessionController();
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authSecret from '../../config/authSecret';
import * as Yup from 'yup';


class SessionController{
  async store(req,res){
     //validação dos campos. 
    const schema = Yup.object().shape({
      
      email: Yup.string().email().required(),
      password: Yup.string().required(),

    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha na validação dos campos.'});
    }
    //fim da validação

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
    
      token: jwt.sign({ id },authSecret.secret, {
        expiresIn: authSecret.expiresIn,
      })
    })
  }



}

export default new SessionController();
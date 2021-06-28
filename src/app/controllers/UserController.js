import User from '../models/User';
import * as Yup from 'yup';

class UserController {

  //create
  async store(req,res){
    //validações com yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),

    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha na validação dos campos.'});
    }

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
  //listar todos.
  async index(req,res){
    const users = await User.findAll({
      attributes:['id','name','email']
    });
    return res.json(users);
  }
  //update
  async update(req,res){
    //validação de campos.
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field)=>
        oldPassword ? field.required() : field
      ),
      //caso o usuario va mudar a senha vai ser necessário esse campo de
      //confirmação da senha.
      confirmPassword: Yup.string().when('password',(password, field)=>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    
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
  async delete(req,res){
    const {id} = await User.findOne({where:{id: req.params.id}});
    if(id != undefined){
      if(!isNaN(id)){
        User.destroy({
          where:{
            id:id
          }
        }).then(()=>{
          res.json({message: 'Excluido com sucesso!'})
        });
      }else{
        res.status(400).json({error: 'Esse id não é um número.'});
      }
    }else{
      res.status(400).json({error: 'Id undefined'});
    }
  }


}

export default new UserController();
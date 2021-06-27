import jwt from 'jsonwebtoken';
import authSecret from '../../config/authSecret';
import { promisify } from 'util';

//esse aquivo é tipo o guardião de rotas do angular.
//antes de ir para alguma rota tem que passar por ele, caso precise de 
//autenticação.
export default async (req,res, next)=>{
  const authHeader = req.headers.authorization;
 
   if(!authHeader){
    return res.status(401).json({Error: 'Token não informado!'});
   }

   const token = authHeader.split(' ')[1];

   try {
     //o promisify transforma uma função de callback em uma função asincrona.
      const decoded = await promisify(jwt.verify)(token, authSecret.secret);

      req.userId = decoded.id;

      console.log(decoded);
      return next();
   } catch (error) {
      return res.status(401).json({error: 'Token inválido!'});

   }
   
   
}
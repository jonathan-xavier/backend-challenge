import Summoner from "../models/Summoner";
import axios from "axios";
require('dotenv').config();


class WinsController {

  async index(req,res){
    const data = await Summoner.findAll({
         attributes:['id','nickname','account_id','summoner_level',
       'profile_icon_id','summoner_id']
       
    })

    // const response = await axios
    // .get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${summoner_id}`,
    // {headers:  { 'X-Riot-Token': process.env.LOL_TOKEN } })
    // .catch(e => {
    //   return res.status(e.response.status).json(e.response.data);
    // });
    // const data = response.data;
     var id = data.rows[0];
    return res.json(id);

    // return res.status(200).json(id,summoner_id,nickname,account_id,
    //   summoner_level,profile_icon_id,summoner_id,wins,losses);


  }
}

export default new WinsController();
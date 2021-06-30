import axios from 'axios';
import Summoner from '../models/Summoner';
import axios from 'axios';
require('dotenv').config();

class SummonerController {

  async store(req, res) {

    const {summonerName} = req.body;

    const userId = req.userId;

    const response = await axios
      .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
        { headers: { 'X-Riot-Token': process.env.LOL_TOKEN } })
      .catch(e => {
        return res.status(e.response.status).json(e.response.data);
      });


     const {id,accountId,profileIconId,summonerLevel,name} = response.data;
    //const data = response.data;

    const data = await Summoner.create({
      nickname: name,
      account_id:accountId,
      summoner_level: summonerLevel,
      summoner_id:id,
      profile_icon_id: profileIconId,
      userid: userId
    });

    return res.status(200).json(data);
  }


  async index(req, res) {
    const summoner = await Summoner.findAll({
        attributes:['id','nickname','account_id','summoner_level',
        'profile_icon_id','summoner_id']
    })
    return res.json(summoner);

  }

  async update() {

  }
  async delete() {

  }
}
export default new SummonerController();
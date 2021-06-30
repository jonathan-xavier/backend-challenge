import Sequelize,{Model} from 'sequelize';

class Summoner extends Model {
  static init(sequelize){
    super.init({
      // summonerName: Sequelize.VIRTUAL,
      nickname: Sequelize.STRING,
      account_id: Sequelize.STRING,
      summoner_level: Sequelize.INTEGER,
      profile_icon_id: Sequelize.INTEGER,
      summoner_id: Sequelize.STRING,
      userid: Sequelize.INTEGER,
    },
    {
      sequelize,
    });
    // this.addHook('beforeSave',async (summoner)=>{
    //   if(summoner.summonerName){
    //     summoner.nickName = summonerName;
    //   }
    // })
    return this;
  }

  static associate(models){
    this.belongsTo(models.User, {foreignKey: 'userid'});
  }
}

export default Summoner;
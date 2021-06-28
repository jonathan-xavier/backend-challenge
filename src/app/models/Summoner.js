import Sequelize,{Model} from 'sequelize';

class Summoner extends Model {
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
    },
    {
      sequelize,
    });
    return this;
  }

  static associate(models){
    this.belongsTo(models.User, {foreignKey: 'userId'});
  }
}

export default Summoner;
const { Op, Sequelize } = require('sequelize');
const { sequelize } = require('../models/User');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    // Encontrar todos usuários que tem email que termina com @aprender.com
    // Desses usuários eu quero buscar todos que moram na rua "AprederTerça"
    // Desses usuários eu quero buscar as tecnologias que começam com React

    const users = await User.findAll({
      attributes: ['name','email'],
      where:{
        [Op.or]:[
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')),{
            [Op.like]:'%@aprender.com'
          })
        ]
      },
      include: [
        { 
          association: 'addresses', 
          where: { 
            street: 'AprenderTerça'
          } 
        },
        { 
          association: 'techs', 
          required: true,
          where: {
            name: {
              [Op.like]: 'React%'
            }
          }
        },
      ]
    })

    return res.json(users);
  }
};
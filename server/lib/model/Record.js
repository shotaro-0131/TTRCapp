var Sequelize = require('sequelize');

module.exports = function (db) {
  var RecordItem = require('./RecordItem')(db)
  var User = require('./User')(db)
  let Record = db.define('Record', {
    player_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    registerer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    item_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: RecordItem,
        key: 'id'
      }
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    result: {
      type: Sequelize.STRING,
      allowNull: false
    },
    extends: {
      type: Sequelize.JSON,
      allowNull: true
    }
  })
  return Record
}
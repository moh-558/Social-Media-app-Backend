module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const PostReply = sequelize.define(
      "posts_reply",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        reply: {
          type: DataTypes.STRING(5000),
          allowNull: false,
          min: 1,
          max: 5000,
        }
      },
      {
        underscored: true,
        timestamps: false,
        freezeTableName: true,
        // define the table's name
        tableName: "posts_reply",
      }
    );
  
    return PostReply;
  };
  
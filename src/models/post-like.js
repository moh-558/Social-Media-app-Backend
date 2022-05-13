module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const PostReply = sequelize.define(
      "posts_like",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        underscored: true,
        timestamps: false,
        freezeTableName: true,
        // define the table's name
        tableName: "posts_likes",
      }
    );
  
    return PostReply;
  };
  
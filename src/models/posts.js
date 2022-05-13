module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Posts = sequelize.define(
      "posts",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        post: {
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
        tableName: "posts",
      }
    );
  
    return Posts;
  };
  
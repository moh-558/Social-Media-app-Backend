module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Users = sequelize.define(
      "users",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(200),
          allowNull: false,
          min: 1,
          max: 100,
        }
      },
      {
        underscored: true,
        timestamps: false,
        freezeTableName: true,
        // define the table's name
        tableName: "users",
      }
    );
  
    return Users;
  };
  
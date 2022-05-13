/*
* FILE          : config.js
* PROGRAMMERs   : Mohammed Abusultan
* FIRST VERSION : 2022-04-1
* DESCRIPTION   : This file is responsible of the connection of mySql database
*                 you will have to change user name and password to connect to your
*                 local server on order to get the posts. 
*                 
*                
*/


module.exports = {
  local:{
    host: "localhost",
    database: "posts",
    username: "root",
    password: "root",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },

  test:{
  host: "localhost",
  database: "posts_test",
  username: "root",
  password: "root",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  }
  
};

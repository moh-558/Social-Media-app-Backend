const Sequelize = require('sequelize');


const configs = require('./config')
const {local,test} = configs
let config =  process.env.NODE_ENV && process.env.NODE_ENV === "test" ? test : local
console.log('config ',config);
const sequelize = new Sequelize(

    process.env.db_name || config.database,
    process.env.db_username || config.username,
    process.env.db_password || config.password,
    {
        dialect:config.dialect,
        host:process.env.db_host|| config.host,
        pool:{

            ...config.pool
        }
    }

)  
module.exports = {
    sequelize,
    Sequelize
}

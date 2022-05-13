const { sequelize, Sequelize } = require('./../database')

const Posts = require('./posts')
const PostReply = require('./post-reply')
const User = require('./users')
const PostLike = require('./post-like')

/**
 * initializing models 
 */

 
const PostModel = Posts(sequelize, Sequelize)
const PostReplyModel = PostReply(sequelize, Sequelize)
const UserModel = User(sequelize, Sequelize)
const PostLikeModel = PostLike(sequelize, Sequelize)

/**
 * association models 
 */

 PostModel.belongsTo(UserModel)
 PostLikeModel.belongsTo(UserModel)
 PostLikeModel.belongsTo(PostModel)
 PostReplyModel.belongsTo(UserModel)

 module.exports = {
     PostModel,
     PostReplyModel,
     UserModel,
     PostLikeModel
 }
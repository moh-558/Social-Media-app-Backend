/*
* FILE          : Post-reply.js
* PROGRAMMERs   : Mohammed Abusultan
* FIRST VERSION : 2022-02-25
* DESCRIPTION   : This file is resposible of creting post reply.
*                
*                 
*                 
*                
*/


const express = require('express');
const {PostReplyModel} = require('../models')
const router = express.Router();



const create = async (req,res)=>{
    try{
        const {id} = req.params
        if(!id)
        {
            return res.send(400,{
                status:"Error",
                message:"post id require"
            })
        }
    
    console.log('creating post reply ',req.body);
    const body = req.body
    if(!body.userId || !body.reply|| body.reply.length == 0){
        res.send(400,{
            status:"Error",
            message:"Invalid body, reply or user id required"
        })
    }
   const createResponse =  await PostReplyModel.create({
        ...body
    })
    console.log('reply created',createResponse);
    res.send({
        status:"Success",
        message:`Reply created ${createResponse.dataValues.id}`
    })
}
catch(e){
    console.log('e',e);
    let message = "Internal server error"
    switch (e.name) {
        case "SequelizeForeignKeyConstraintError":
            message =  e.message || "INTERNAL SERVER ERROR" 
        }
    res.send(
        500,{
        status:"Error",
        message
    })
}

}

const list= async (req,res)=>{
    try{
 
        const {page = 1, limit = 5 } = req.query
        let offset = 0 + (page - 1) * limit;
        let reply = await PostReplyModel.findAndCountAll({
            order: [["id", "DESC"]],
            limit: parseInt(limit),
            offset: offset,
          });
          res.send(200,{
              status:"Success",
              data:{
                  page,
                  limit,
                  total:reply.count,
                  reply:reply.rows
              }
          })
    }catch(e){
        console.log(e);
        res.send(
            500,{
            status:"Error",
            message:"Internal server error"
        })
    }
}

const update = async (req,res)=>{
    try{
        console.log('req',req.params);
        const {id} = req.params
        const {reply}= req.body

        if(!id)
        {
            return res.send(400,{
                status:"Error",
                message:"reply id require"
            })
        }
        if(!reply){
            return res.send(400,{
                status:"Error",
                message:"updated reply require"
            })
        }
        const updateReply = await PostReplyModel.update(
            {reply},
            {
            where:{
                id
            }
        })
        console.log('updated',updateReply);
        updateReply && updateReply[0] ?res.send(200,{
            status:"Success",
            message:"Updated"
            
        }):res.send(400,{
            status:"Error",
            message:`Reply not found with id ${id}`
            
        })
     
    }catch(e){
        console.log(e);
        res.send(
            500,{
            status:"Error",
            message:"Internal server error"
        })
    }
}
const del = async (req,res)=>{
try{
    console.log('req',req.params);
    const {id} = req.params
    if(!id)
        {
            return res.send(400,{
                status:"Error",
                message:"reply id require"
            })
        }
    const delReply = await PostReplyModel.destroy({
        where:{
            id
        }
    })
    console.log('del post ',delReply);
    delReply ?res.send(200,{
        status:"Success",
        message:"Deleted"
        
    }):res.send(400,{
        status:"Error",
        message:`Reply not found with id ${id}`
        
    })

    
}catch(e){
    console.log(e);
        res.send(
            500,{
            status:"Error",
            message:"Internal server error"
        })
}
}



router.post("/:id",create)
router.get("/:id",list)
router.delete("/:id",del)
router.put("/:id",update)
module.exports = {
    basePath:"/reply",
    router
}
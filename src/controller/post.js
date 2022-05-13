/*
* FILE          : Post.js
* PROGRAMMERs   : Mohammed Abusultan
* FIRST VERSION : 2022-04-1
* DESCRIPTION   : This file is responsible of creating posts, likes
*                 , update, delete.
*                   
*                 
*                
*/

const express = require("express");
const { PostModel, PostLikeModel } = require("./../models");
const router = express.Router();

const create = async (req, res) => {
  try {
    console.log("creating post ", req.body);
    const body = req.body;
    if (!body.userId || !body.post || body.post.length == 0) {
      res.send(400, {
        status: "Error",
        message: "Invalid body, post or user id required",
      });
    }
    const createResponse = await PostModel.create({
      ...body,
    });

    res.send({
      status: "Success",
      message: `Post created ${createResponse.dataValues.id}`,
      data: createResponse.dataValues,
    });
  } catch (e) {
    console.log("e", e);
    res.send(500, {
      status: "Error",
      message: "Internal server error",
    });
  }
};

const list = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    let offset = 0 + (page - 1) * limit;
    let posts = await PostModel.findAndCountAll({
      order: [["id", "DESC"]],
      limit: parseInt(limit),
      offset: offset,
    });
    res.status(200).send(200, {
      status: "Success",
      data: {
        page,
        limit,
        total: posts.count,
        posts: posts.rows,
      },
    });
  } catch (e) {
    console.log(e);
    res.send(500, {
      status: "Error",
      message: "Internal server error",
    });
  }
};

const likeList = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const { page = 1, limit = 5 } = req.query;
    let offset = 0 + (page - 1) * limit;
    let where = {};
    if (postId) {
      where = {
        ...where,
        postId,
      };
    }
    if (userId) {
      where = {
        ...where,
        userId,
      };
    }
    let posts = await PostLikeModel.findAndCountAll({
      order: [["id", "DESC"]],
      limit: parseInt(limit),
      offset: offset,
      where,
    });
    res.send(200, {
      status: "Success",
      data: {
        page,
        limit,
        total: posts.count,
        posts: posts.rows,
      },
    });
  } catch (e) {
    console.log(e);
    res.send(500, {
      status: "Error",
      message: "Internal server error",
    });
  }
};

const like = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    console.log("req.params", req.params);
    if (!postId || !userId) {
      res.send(400, {
        status: "Error",
        message: "post id and user id required",
      });
    }
    const created = await PostLikeModel.upsert(
      {
        postId,
        userId,
      },
      {
        postId,
        userId,
      }
    );

    res.status(200).send({
      status: "Success",
      message: ` Post ${postId} liked by user ${userId}`,
    });
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
    let message = "Internal server error";
    switch (e.name) {
      case "SequelizeForeignKeyConstraintError":
        message = e.message || "INTERNAL SERVER ERROR";
    }
    res.send(500, {
      status: "Error",
      message,
    });
  }
};

const update = async (req, res) => {
  try {
    console.log("req", req.params);
    const { id } = req.params;
    const { post } = req.body;

    if (!id) {
      return res.send(400, {
        status: "Error",
        message: "post id required",
      });
    }
    if (!post) {
      return res.send(400, {
        status: "Error",
        message: "updated post required",
      });
    }
    const updatePost = await PostModel.update(
      { post },
      {
        where: {
          id,
        },
      }
    );
    console.log("updated", updatePost);
    updatePost && updatePost[0]
      ? res.send(200, {
          status: "Success",
          message: "Updated",
        })
      : res.send(400, {
          status: "Error",
          message: `Post not found with id ${id}`,
        });
  } catch (e) {
    console.log(e);
    res.send(500, {
      status: "Error",
      message: "Internal server error",
    });
  }
};

const get = async (req, res) => {
  try {
    console.log("req", req.params);
    const { id } = req.params;
    const found = await PostModel.findOne({
      where: {
        id,
      },
    });
    if (!found)
      return res.send(400, {
        status: "Error",
        message: "Post not found",
      });
    const postLikes = await PostLikeModel.count({
      where: {
        postId: id,
      },
    });
    console.log(found, postLikes);
    res.send(200, {
      status: "Success",
      data: {
        ...found.dataValues,
        like: postLikes,
      },
    });
  } catch (e) {}
};
const del = async (req, res) => {
  try {
    console.log("req", req.params);
    const { id } = req.params;
    if (!id) {
      return res.send(400, {
        status: "Error",
        message: "post id require",
      });
    }
    const delPost = await PostModel.destroy({
      where: {
        id,
      },
    });
    console.log("del post ", delPost);
    delPost
      ? res.status(200).send({
          status: "Success",
          message: "Deleted",
        })
      : res.status(400).send(400, {
          status: "Error",
          message: `Post not found with id ${id}`,
        });
  } catch (e) {
    console.log(e);
    res.send(500, {
      status: "Error",
      message: "Internal server error",
    });
  }
};

router.post("/", create);
router.get("/", list);
router.get("/:id", get);
router.delete("/:id", del);
router.put("/:id", update);
router.post("/like/:postId/:userId", like);
router.get("/like/:postId", likeList);
module.exports = {
  basePath: "/post",
  router,
};

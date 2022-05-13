/*
* FILE          : test.js
* PROGRAMMERs   : Mohammed Abusultan
* FIRST VERSION : 2022-04-1
* DESCRIPTION   : This file is responsible of the aotumated tests for the 
*                 backend api, it uses Chai.
*                   
*                 
*                
*/


//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./index");
let should = chai.should();
const {
  PostModel,
  UserModel,
  PostLikeModel,
  PostReplyModel,
} = require("./src/models");
chai.use(chaiHttp);

describe("Posts", () => {
  before((done) => {
    //Before each test we empty the database
    (async () => {
      try {
        await PostLikeModel.destroy({
          where: {},
          truncate: true,
        });
        await PostReplyModel.destroy({
          where: {},
          truncate: true,
        });
        await PostModel.destroy({
          where: {},
          truncate: { cascade: true },
        });

        done();
      } catch (e) {
        console.log("eee", e);
        done();
      }
    })();
  });
  /*
   * Test the /GET route
   */
  describe("/Posts", () => {
    it("it should create the post", (done) => {
      chai
        .request(server)
        .post("/post")
        .send({
          post: "hi this is test post",
          userId: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.should.have.property("status").eql("Success");
          done();
        });
    });

    it("it should create another post", (done) => {
      chai
        .request(server)
        .post("/post")
        .send({
          post: "hi this is test post 2",
          userId: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.should.have.property("status").eql("Success");
          done();
        });
    });

    it("it should get all the post", (done) => {
      chai
        .request(server)
        .get("/post")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.have.property("posts");
          res.body.data.posts.should.be.a("array");
          res.body.data.posts.length.should.be.eql(2);
          done();
        });
    });
    it("it should delete the post", (done) => {
      let deletePostId;
      chai
        .request(server)
        .get("/post")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.have.property("posts");
          res.body.data.posts.should.be.a("array");
          res.body.data.posts.length.should.be.eql(2);
          deletePostId = res.body.data.posts[0].id;
          chai
            .request(server)
            .delete(`/post/${deletePostId}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("status");
              res.body.should.have.property("status").eql("Success");
              done();
            });
        });
    });

    it("it should like the post", (done) => {
      let likePostId;
      chai
        .request(server)
        .get("/post")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.have.property("posts");
          res.body.data.posts.should.be.a("array");
          res.body.data.posts.length.should.be.eql(1);
          likePostId = res.body.data.posts[0].id;
          chai
            .request(server)
            .post(`/post/like/${likePostId}/1`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("status");
              res.body.should.have.property("status").eql("Success");
              done();
            });
        });
    });

    it("it should comment on the post", (done) => {
      let commentOnPost;
      chai
        .request(server)
        .get("/post")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.have.property("posts");
          res.body.data.posts.should.be.a("array");
          res.body.data.posts.length.should.be.eql(1);
          commentOnPost = res.body.data.posts[0].id;
          chai
            .request(server)
            .post(`/post/like/${commentOnPost}/1`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("status");
              res.body.should.have.property("status").eql("Success");
            });
          done();
        });
    });
  });
});

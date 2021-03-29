// var express = require('express');
// var router = express.Router();
// const objectId = require("mongodb").ObjectID;
//
// exports.findAll = function(req, res) {
//   const collection = req.app.locals.recipesCollection;
//   collection.find({}).toArray(function(err, recipes){
//     if(err) return console.log(err);
//     res.send(recipes)
//   })
// }
//
// exports.addNew = function(req, res) {
//   if(!req.body) return res.sendStatus(400);
//
//   const name = req.body.name;
//   const createdAt = req.body.createdAt;
//   const ingredients = req.body.ingregients;
//   const comments = req.body.comments;
//   const scores = req.body.scores;
//   const createdBy = req.body.createdBy;
//   const recipe = {name, createdAt, ingredients, comments, scores, createdBy};
//   const collection = req.app.locals.recipesCollection;
//   collection.insertOne(recipe, function(err, result){
//
//     if(err) return console.log(err);
//     res.send(recipe);
//   });
// }
// // коллекция recepies: { name, createdAt, ingridients: [string],
// //     comments: [{ id, userId, text, createdAt }], scores: [{ id, score }] }
//
// // app.post("/api/users", jsonParser, function (req, res) {
// //
// //   if(!req.body) return res.sendStatus(400);
// //
// //   const userName = req.body.name;
// //   const userAge = req.body.age;
// //   const user = {name: userName, age: userAge};
// //
// //   const collection = req.app.locals.collection;
// //   collection.insertOne(user, function(err, result){
// //
// //     if(err) return console.log(err);
// //     res.send(user);
// //   });
// // });
// module.exports = router;

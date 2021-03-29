const express = require("express");
let cors = require('cors')
const app = express();
const bp = require('body-parser')
const MongoDB = require('./db')
const db = new MongoDB('mongodb://localhost:27017', 'recipesdb', ['users', 'recipes', 'tokens']);
module.exports = {db}
const ObjectId = db.ObjectID;
const AuthRouter = require('./routes/Oauth')
const users = require('./routes/users')


db.connected.then(() => {app.listen(8080, function(){
  console.log("Server is ready...");
});})

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors())

app.use("/auth/", AuthRouter)
app.get("/recipes", async function(req, res) {
  const collection = db.recipes;
  const recipes = await collection.aggregate([
    {
      $project: {
        name: 1,
        createdAt:1,
        ingredients: 1,
        description: 1,
        scores: 1,
        userId:1,
        numberOfComments: {$cond: { if: { $isArray: "$comments" }, then: { $size: "$comments" }, else: "NA"}}
      }
    }
  ] )
  let recipesArray = await recipes.toArray()
  let users = Array.from(new Set(recipesArray.map(recipe => recipe.userId)))
  const userInfo = db.users.find({id : users})
  let usersArray = await userInfo.toArray()
  const usersEdited = usersArray.reduce((usersEdited, user) => (usersEdited[user.id] = user, usersEdited), {})
  const result = recipesArray.map(recipe => {
    recipe.user = usersEdited[recipe.userId]
    return recipe
  })
  res.send(result);
});

app.get("/comments", async function (req,res) {
  if(!req.body) return res.sendStatus(400);
  const collection = db.recipes;
  const {recipeId, userId} = req.query
  const a = await collection.aggregate([
    { $match: {_id: ObjectId(recipeId)}},
    { $project: {comments: 1}
    }
  ] )

  const comments = (await a.toArray())[0].comments
  console.log(comments)
  const userInfo = await db.users.find({id: {$in: Array.from(new Set(comments.map(comment => comment.userId)))}})
  console.log(Array.from(new Set(comments.map(comment => comment.userId))))
  let usersArray = await userInfo.toArray()
  const usersEdited = usersArray.reduce((usersEdited, user) => (usersEdited[user.id] = user, usersEdited), {})
  const result = comments.map(comment => {
    comment.user = usersEdited[comment.userId]
    return comment
  })
  console.log(result)
  console.log(usersEdited)
  console.log(usersArray)


  res.send(result);
});

app.post("/recipes", function(req, res) {
  if(!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const createdAt = Date.now();
  const ingredients = req.body.ingredients;
  const description = req.body.description;
  const comments = []
  const scores = {}
  const userId = req.body.userId;
  const recipe = {name, createdAt, ingredients, description, comments, scores, userId};
  const collection = db.recipes;
  collection.insertOne(recipe, function(err, result){
    if(err) return console.log(err);
    res.send(recipe);
  });
})

app.post("/comment", async function(req, res) {
  if(!req.body) return res.sendStatus(400);
  const createdAt = Date.now();
  const {recipeId, userId, text } = req.body
  const comment = {userId, text, createdAt};
  const collection = db.recipes;
  const recipeObject = await collection.findOne({_id: ObjectId(recipeId)})
  if (!recipeObject) return res.sendStatus(400);
  recipeObject.comments.unshift(comment)
  console.log(recipeObject)
  const result = await collection.save(recipeObject);
  res.send(result)
})

app.post("/score", async function (req,res) {
  if(!req.body) return res.sendStatus(400);
  const {userId, recipeId, score} = req.body
  const collection = db.recipes;
  const recipeObject = await collection.findOne({_id: ObjectId(recipeId)})
  if (!recipeObject) return res.sendStatus(400);
  recipeObject.scores[userId] = score
  console.log(recipeObject)
  const result = await collection.save(recipeObject);
  res.send(result)
})

app.delete("/recipe/:id", async function (req,res) {
  if(!req.params) return res.sendStatus(400);
  try {
    const id  = ObjectId(req.params.id)
    const collection = db.recipes;
    collection.deleteOne({"_id": id})
    res.sendStatus(200);  }
  catch (e) {
    return res.sendStatus(500);
  }
})

// function(req, res){
//   const id = new objectId(req.params.id);
//   const collection = req.app.locals.collection;
//   collection.findOne({_id: id}, function(err, unit){
//     if(err) return console.log(err);
//     res.send(unit);
//   })
// }


process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});


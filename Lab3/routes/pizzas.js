var express = require('express');
var router = express.Router();
var mongoclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbname = 'ejemplo';
router.post('/', function(req,res,next){
    mongoclient.connect(url,{ useNewUrlParser: true},(err,client)=>{
      if(err) return next(createError(500))
      const database = client.db(dbname)
      const collection = database.collection('pizzas')
      collection.insertOne(req.body,err=>{
        if(err) return next(createError(500))
        res.status(201).end()
      })
    })
  })
router.get('/:name', function(req, res, next) {
    mongoclient.connect(url,{ useNewUrlParser: true},(err,client)=>{
        if(err) return next(createError(500))
        const database = client.db(dbname)
        const collection = database.collection('pizzas')
        collection.findOne({name:req.params.name},function(err,jdoc){
          if(err) return next(createError(500))
          res.status(200).json(jdoc)
        })
      })
  });
  router.get('/',function(req,res,next){
      mongoclient.connect(url,{useNewUrlParser:true},(err,client)=>{
          if(err) return next(createError(500))
          const database = client.db(dbname)
          const collection = database.collection('pizzas')
          collection.find({}).toArray((err,jdocs)=>{
              if(err) return next(createError(500))
              res.status(200).json(jdocs)
        })
      })
  });
  router.delete('/:name', function(req, res, next) {
    mongoclient.connect(url,{ useNewUrlParser: true},(err,client)=>{
        if(err) return next(createError(500))
        const database = client.db(dbname)
        const collection = database.collection('pizzas')
        collection.deleteOne({name:req.params.name},err=>{
            if(err) return next(createError(500))
            res.status(202).end()
        })
      })
  });
  router.put('/:name', function(req, res, next) {
    mongoclient.connect(url,{ useNewUrlParser: true},(err,client)=>{
        if(err) return next(createError(500))
        const database = client.db(dbname)
        const collection = database.collection('pizzas')
        collection.update({name:req.params.name},{$set: req.body},err=>{
            if(err) return next(createError(500))
            res.status(202).end()
        })
      })
  });



module.exports = router;
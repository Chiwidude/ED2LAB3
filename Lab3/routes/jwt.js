var express = require('express');
var router = express.Router();

//jsonWebToken
var jwebtoken = require('jsonwebtoken')
var jwebt_simple = require('jwt-simple')

router.post('/:jwebtoken',function(req,res){
    var secret = req.params.jwebtoken
    token = gjwtToken(req.body,secret)
    console.log(token)
    res.status(200).json(token)
})


function gjwtToken(jwt,kword){
    jwebt_simple.encode(jwt,kword)

    return token = jwebtoken.sign(jwt,kword,{
        expiresIn: '1m'
    })
}

module.exports = router;

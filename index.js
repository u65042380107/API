const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()
const connection = mysql.createConnection(process.env.DB_URL)

app.get('/',function(req , res ,next){
    res.json({msg: 'Hello!!'})
})

app.get('/attractions',function(req , res ,next){
    connection.query('SELECT * FROM attractions',
        function(err, result, fields){
            res.json(result)
        }
    )
})

app.listen(process.env.PORT || 3000)
const mysql = require('mysql2');
const { createHandler } = require('@netlify/functions');
require('dotenv').config();

const connection = mysql.createConnection(process.env.DB_URL);

const handler = async (event, context) => {
  if (event.httpMethod === 'GET' && event.path === '/') {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Hello!!' }),
    };
  }

  if (event.httpMethod === 'GET' && event.path === '/attractions') {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM attractions', (err, result) => {
        if (err) return reject(err);
        resolve({
          statusCode: 200,
          body: JSON.stringify(result),
        });
      });
    });
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ msg: 'Not Found' }),
  };
};

exports.handler = createHandler(handler);


// const express = require('express')
// const cors = require('cors')
// const mysql = require('mysql2')
// require('dotenv').config()

// const app = express()
// const connection = mysql.createConnection(process.env.DB_URL)

// app.get('/',function(req , res ,next){
//     res.json({msg: 'Hello!!'})
// })

// app.get('/attractions',function(req , res ,next){
//     connection.query('SELECT * FROM attractions',
//         function(err, result, fields){
//             res.json(result)
//         }
//     )
// })

// app.listen(process.env.PORT || 3000)
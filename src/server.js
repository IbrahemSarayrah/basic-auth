'use strict';

const express = require('express');
const app = express();
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const basicAuth = require('./auth/routes/router');

app.use(express.json());

app.use(basicAuth);

app.get('/', (req, res) => {
  res.status(200).send('Working...');
});

app.get('/bad',(req, res, next)=> {
  next ('Error Bad End Point');
});
  
app.use('*' , notFoundHandler);
app.use(errorHandler);
  


module.exports= {
  server: app,
  start : port =>{
    app.listen(port,()=> console.log(`listen on port ${port}`));
  },
};
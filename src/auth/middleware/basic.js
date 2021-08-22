'use strict';

const {Users}= require('../../models/index');
const bcrypt = require('bcrypt');
const base64 = require('base-64');


async function signup (req,res,next){

  try {

    let authHeader = req.headers.authorization;
    console.log(authHeader);
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const valid = await Users.findOne({ where: { username: req.body.username } });

    if(!valid) {
      const record = await Users.create({
        username : req.body.username,
        password : req.body.password,
      });
      res.status(201).json(record);
      next();
    } else {
      next('username already in database');
    }

  } catch (e) { 
    console.log(e);
    res.status(403).send('Error Creating User');
    next('Error Creating User');
  }
}

async function signin (req,res,next){
  let basicHeaderParts = req.headers.authorization.split(' '); 
  let encodedString = basicHeaderParts.pop();  
  let decodedString = base64.decode(encodedString); 
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
      next();
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }


}

module.exports = {
  signin,
  signup,
};
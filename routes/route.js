const express = require('express');
const lodash =  require('loadsh');
const router = express.Router();
const userController = require('../controller/user.controller');
var mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/db");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log("connection to db open")
});

router.get('/get',(req,res) =>{
  try{
         userController.getAllUser((err,user)=>{
           console.log("********Inside controller*********");
          if (err) {
            console.log(`Error in fetching participant with username`, err);
            res.status(400).send({ error: config.STATUS_MSG.STATUS_400.msg });
          } else {
            console.log('user list in response',user);
            res.status(200).send(user);
          }
         })
  }
  catch(err)
  {
    console.log("Error in fetching", err);
    res.status(500).send("Internal server error");
  }
})

router.post('/post',(req,resp)=>{
  try {
    const {
      id,
      name,
      age
    } = req.body;
    const userDetails = {
      id,
      name,
      age
    };

    // if (lodash.isEmpty(id)
    //   || lodash.isEmpty(name)
    //   || lodash.isEmpty(age)
    // ) {
    //   console.log(`reuqired values not present${JSON.stringify(req.body, null, '  ')}`);
    //   return res.status(400).send("Bad request");
    // }

  userController.createNewUser(userDetails, (err, user) => {
      if (err) {
        console.log(`Error in creating new user for ${JSON.stringify(userDetails, null, ' ')}`, err);
        resp.status(400).send("Bad request");
      } else {
        console.log('saved response++++++');
        resp.status(201).send(user);
      }
    });
  } catch (err) {
    console.log("Error caught in creating new user", err);
    resp.status(500).send('Internal server error');
  }
})

router.get('/get/:id',(req,resp)=>{
  try{
    const id = req.params.id;
    userController.getUserById(id,(err,user)=>{
      if(err){
        console.log('error while fetching user');
        resp.status(404).send('user with this id does not exists');
      }
      else{
        console.log('get user informations');
        resp.status(200).send(user);
      }
    })

  }
  catch(err)
  {
    console.log('In catch Error');
    resp.status(500).send('Internal Server error!!');
  }
})

router.delete('/delete/:id',(req,resp)=>{
  try{
    const id = req.params.id;
    userController.deleteUserById(id,(err,user)=>{
      if(err)
      {
        console.log('Error while deleting');
        resp.status(404).send('user with this is does not exists');
      }
      else{
        console.log('deleted successfully');
        resp.status(200).send(user);
      }
    })

  }
  catch(err)
  {
    console.log('Error while deleting');
    resp.status(500).send('Error while deleting');
  }
})

router.put('/put/:id',(req,resp)=>{
  try{
    const id1 = req.params.id;
    const {
      id,
      name,
      age
    } = req.body;
    const userDetails = {
      id,
      name,
      age
    };
    userController.updateUserById(userDetails ,id1,(err,user)=>{
      if(err)
      {
        console.log('Error while updating');
        resp.status(404).send('user with this is does not exists');
      }
      else{
        console.log('updated successfully');
        resp.status(200).send(user);
       }
    })
  }
  catch(err)
  {
    console.log('Error while updating');
    resp.status(500).send('Error while updating');
  }
})

// router.get('/:username', (req, res) => {
//   try {
//     if (req.params.username === undefined) {
//       logger.error("username provided in params is not valid!!");
//       res.status(400).send({ error: config.STATUS_MSG.STATUS_400.msg });
//       return;
//     }

//     const options = {
//       programScheduleState: (req.query.pss === "true"),
//     };

//     participantController.getParticipantByUserName(req.params.username, options,
//       (err, participant) => {
//         if (err) {
//           logger.error(`Error in fetching participant with username ${req.params.username}`, err);
//           res.status(400).send({ error: config.STATUS_MSG.STATUS_400.msg });
//         } else {
//           res.status(200).send(participant);
//         }
//       });
//   } catch (err) {
//     logger.error("Error in fetching existing participant", err);
//     res.status(500).send({ error: config.STATUS_MSG.INTERNAL_ERROR_500.msg });
//   }
// });

module.exports = router;
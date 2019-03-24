const lodash = require('lodash');
const user = require('../model/userModel');

function createNewUser(userObj, done) {
  console.log('*****UserObject******',userObj);
  // if (lodash.isEmpty(userObj.id)
  //   || lodash.isEmpty(userObj.name)
  //   || lodash.isEmpty(userObj.age)
  // ) {
  //   done({ error: new Error('Please provide the required fields for the user.!!') });
  //   return;
  // }
  const newuser = new user({
    id: userObj.id,
    name: userObj.name,
    age: userObj.age
  });

  console.log('New User to be saved+++++++',newuser);
  newuser.save((err,savedUser) =>{
    if(err)
    {
      console.log('Errro in ssave');
    }
    console.log('Inside save method++++++',savedUser);
    // if (err) {
    //   console.log("Error while saving participant obj, ERROR::", err);
    //   done({ error: (err.message || 'Error in saving new participant, please try later..!') });
    // } else {
      // console.log(savedparticipantObj)
      console.log('saved user******',savedUser);
      done(null, savedUser.toObject());
      console.log('After Done in service@@@@@@@@@');
    // }
  });
}

function getUsers(done){
const users = {};
     user.find({}).then(function(users){
       console.log('inside service*******',users);
       done(null,users);
     })

}
function getUserById(id,done)
{ 
  console.log('+++++Inside servcie++++++',id);
  user.findOne({'id':id}).then(function(user){
    if(!user)
    {
      console.log('User doesnot exists');
      done(null,'user Does not exists');
    }
    console.log('Fetch user by id from db+++++',user);
    done(null,user);
  })

}

function deleteUserById(id,done)
{
  console.log('*******Inside service**********');
  user.findOneAndRemove({'id':id}).then(function(user){
    if(!user)
    {
      console.log('User doesnot exists');
      done(null,'user Does not exists');
    }
    console.log('Fetch user by id from db+++++',user);
    done(null,user);
  })

}

function updateByUserId(user1,id1,done){
  console.log('*******Inside service**********');
  user.update({id: id1},
    {
name: user1.name,
age   : user1.age
}, function(err, docs){
if(err) {
  console.log('Error in updating');
  done(null,'Error in updating');
}
else {
     console.log('updated user',docs);
     done(null,docs);
}   
});

  // user.findOneAndUpdate({'id':id}, {$set:{name:user1.name}},{$set:{age:user1.age}}, function(err, result){
  //   if(err)
  //   {
  //     console.log('User doesnot exists');
  //     done(null,'user Does not exists');
  //   }
  //   console.log('Fetch user by id from db+++++',result);
  //   done(null,result);
  // });
  // user.findByIdAndUpdate({'id':id}).then(function(user){
  //   if(!user)
  //   {
  //     console.log('User doesnot exists');
  //     done(null,'user Does not exists');
  //   }
  //   console.log('Fetch user by id from db+++++',user);
  //   done(null,user);
  // })
}
module.exports ={
  createNewUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateByUserId
}
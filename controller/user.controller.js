const userService = require('./user.service');

function getAllUser(done) {
  userService
    .getUsers( (err, user) => {
      const participantResponse = {
        error: null,
        result: {},
      };
      if (err) {
       console.log('error while fetching',err);
      }  else {
        participantResponse.result = user;
        console.log('**************in contolelr',participantResponse.result);
        done(null, participantResponse);
      }
    });
}

function createNewUser(user,done){
  console.log('^^^^Inside controler^^^^^^^^',user);
  userService.createNewUser(user, done);
  }

 function getUserById(id,done)
 {
     console.log('*****Inside Controller*****',id);
     userService.getUserById(id,done);
 } 

 function deleteUserById(id,done){
   console.log('*****Inside Controller**********');
   userService.deleteUserById(id,done);
 }

 function updateUserById(user,id,done){
   console.log('*****Inside Controller**********');
   userService.updateByUserId(user,id,done);
 }
 
module.exports = {
   getAllUser,
   createNewUser,
   getUserById,
   deleteUserById,
   updateUserById
};
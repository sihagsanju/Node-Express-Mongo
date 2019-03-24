const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
      id: {type:Number, require:true, uniqie:true,index:true},
      name  :{ type:String, require:true},
      age:{type:Number}
})

module.exports = mongoose.model('User',userSchema);
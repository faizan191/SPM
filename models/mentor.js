const mongoose = require ('mongoose');
 const mentorSchema = new mongoose.Schema({
     nameId:{
         type: String,
         require :true
     },
     name:{
         type:String,
         require:TextTrackCue
     }
 })

 const Mentor = mongoose.model('Mentor',mentorSchema);
  module.exports = project;
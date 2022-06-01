const mongoose = require (mongoose);
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    rollNo: {
        type:String,
        require:true
    },
    name: {
        type:String,
        require:true
    }
})

const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;
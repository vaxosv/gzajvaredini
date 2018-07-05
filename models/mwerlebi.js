let mongoose = require('mongoose');

let bookmodel = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    avtori:{
        type: String,
        required: true
    },
    janri:{
        type: Array,
        require: true
    },
    data:{
        type: String,
        require: true
    },
    link:{
        type: String,
        require: true
    }
})

let books = module.exports = mongoose.model("mwerlebi", bookmodel)
const mongoose = require('mongoose')

const Category =  new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        require: true
    },
    enable:{
        type: Boolean,
        require: true,
        default: true
    },
    created:{
        type: Date,
        require: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Category', Category)
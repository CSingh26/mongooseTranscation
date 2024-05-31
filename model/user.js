const mong = require('mongoose')

const userSchema = new mong.Schema({
    sNmae:{
        type: String,
        required: true
    },
    sPassword: {
        type: String,
        required: true
    },
    nMobile: {
        type: Number,
        required: true
    },
    nBalance: {
        type: Number,
        default: 0
    }
})

module.exports = mong.model("User", userSchema)
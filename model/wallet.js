const mong = require('mongoose')

const walletSchema = new mong.Schema({
    iuserID: {
        type: mong.Schema.Types.ObjectId, 
        ref: "User"
    },
    nAmount: {
        type: Number,
        required: true
    },
    sType: {
        type: String,
        required: true
    },
    dDate: {
        type: Date,
        default: Date.now
    },
    nBefBalance: {
        type: Number,
        required: true
    },
    nAftBalance: {
        type: Number,
        required: true
    }
})

module.exports = mong.model("Transaction", walletSchema)
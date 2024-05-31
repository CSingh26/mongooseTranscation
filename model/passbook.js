const mong = require('mongoose')

const passbookSchema = new mong.Schema({
    iUserId: {
        type: mong.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    iTransactionId: {
        type: mong.Schema.Types.ObjectId,
        ref: "Transaction",
        required: true
    },
    imoneyreciverId: {
        type: mong.Schema.Types.ObjectId,
        ref: "User"
    },
    nBalance: {
        type: Number,
        required: true
    }
})

module.exports = mong.model("Passbook", passbookSchema)
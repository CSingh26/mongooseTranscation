const mong = require('mongoose')
const User = require('../model/user')
const Wallet = require('../model/wallet')
const Passbook = require('../model/passbook')

async function handleTransaction(userName, amount, type) {
    const session = await mong.startSession();
    session.startTransaction()

    try {
        const user = await User.findOne({ sName: userName }).session(session);
        if (!user) {
            throw new Error('User not found')
        }

        const befBalance = user.nBalance
        let aftBalance

        if (type === 'credit') {
            aftBalance = user.nBalance + amount
        } else if (type === 'debit') {
            if (user.nBalance < amount) {
                throw new Error('Insufficient Funds')
            }
            aftBalance = user.nBalance - amount
        } else {
            throw new Error('Invalid transaction type')
        }

        const transaction = new Wallet({
            iuserID: user._id,
            nAmount: amount,
            sType: type,
            nBefBalance: befBalance,
            nAftBalance: aftBalance
        })

        await transaction.save({ session })

        user.nBalance = aftBalance
        await user.save({ session })

        const passbookEntry = new Passbook({
            iUserId: user._id,
            iTransactionId: transaction._id,
            nBalance: aftBalance
        })

        await passbookEntry.save({ session })
        await session.commitTransaction()
        session.endSession()

        return { 
            success: true, 
            balance: aftBalance 
        }
    } catch (err) {
        await session.abortTransaction()
        session.endSession();
        return {
            success: false, 
            error: err.message 
        }
    }
}

module.exports = handleTransaction

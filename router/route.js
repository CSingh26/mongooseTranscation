const express = require('express')
const mong = require('mongoose')
const User = require('../model/user')
const handleTransaction = require('../utils/traanasction')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const session = await mong.startSession()
    session.startTransaction()

    try {
        const { name, password, mobile } = req.body
        const user = new User({
            sNmae: name, 
            sPassword: password,
            nMobile: mobile
        })

        await user.save({ session })

        await session.commitTransaction()
        session.endSession()
        res.status(200).send({
            message: "User registered suucessfully"
        })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).send({
            error: err.message
        })
    }
})

router.post('/transaction', async (req, res) => {
    const { userInfo, amount, type} = req.body
    const result = await handleTransaction(userInfo, amount, type)

    if (result.success) {
        res.status(200).send({
            message: 'Transction successful',
            balance: result.balance
        })
    } else {
        res.status(500).send({
            error: result.error
        })
    }
})

module.exports = router
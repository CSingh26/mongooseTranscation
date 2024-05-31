const mong = require('mongoose')
require('dotenv').config({ path: "/Users/chaitanyasingh/Documents/YudizTraining/task6/.env"})

const conn = async () => {
    const url = process.env.URL
    try {
        await mong.connect(url)
        console.log('MongoDB Connected')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = conn
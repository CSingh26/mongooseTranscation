const express = require('express')
const db = require('./utils/db')
const routes = require('./router/route')

const app = express()
app.use(express.json())

db()

app.use('/api', routes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
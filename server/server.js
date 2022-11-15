const mongoose = require('mongoose')

const app = require('./express')
const port = process.env.PORT || 5000

const MONGO_URI = process.env.NODE_ENV === 'test'
? process.env.MONGO_URI_TEST
: process.env.MONGO_URI

mongoose.connect(MONGO_URI)
		.then(() => console.log('Mongodb connected'))
		.catch(err => console.log('Mongodb error'))

app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`)
})
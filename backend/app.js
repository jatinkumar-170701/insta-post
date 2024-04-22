const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const databaseConnection = require('./utils/database')
const socialModel = require('./modals/social');
const commentModel = require('./modals/comment')
const app = express()
app.use(cors())
app.use(bodyParser.json())


app.post('/social/post', async (req, res) => {
    try {
        console.log("fnvfvn", req.body)
        const imageUrl = req.body.imageUrl;
        const description = req.body.description;
        await socialModel.create({ imageUrl, description })
        res.status(201).json({ message: "post registered successfully" })

    } catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
})

app.get('/social-fetch', async (req, res) => {
    try {
        const fetchedData = await socialModel.findAll()
        res.status(200).json({ success: true, fetchedData })

    } catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
})

app.post('/social/comment', async (req, res) => {
    try {
        console.log(req.body)
        const to = req.body.id;
        const comment = req.body.comment
        const commentData = await commentModel.create({ comment, to })
        res.status(201).json({ message: "Data saved Successfully" })
    } catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
})
app.post('/social/fetchcomment', async (req, res) => {
    try {
        console.log(req.body)
        const id = req.body.id;
        const commentData = await commentModel.findAll({ where: { to: id } })
        res.status(200).json({ commentData, success: true })
    } catch (err) {
        res.status(500).json({ message: "something went wrong" })
    }
})
databaseConnection.sync()
    .then(() => {
        app.listen(4000)
        console.log("succesfully working databse connection")
    }).catch((err) => [
        console.log('something wrong with databse connection')
    ])



import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 2113

app.get('/', function(req, res){
    res.send('Helllo world')
})

app.listen(port, hostname, () => {
    console.log("Hello")
})


const express = require('express')
const cors = require('cors')
const Routers = require('./route/user.route')
const app = express();
const mongoose =require('mongoose')

mongoose.connect('mongodb+srv://konain7:Kaunain99@cluster0.rmyvhx6.mongodb.net/multerNoTwo').then(()=>console.log('mongodb connected')).catch(()=>console.log('mongodberror'))


app.use(cors())
app.use(express.json())
app.use(express.static('public'))






app.use('/',Routers)


app.listen(3000,()=>console.log('server live on 3000'))
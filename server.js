

const express = require('express')
const cors = require('cors')
const Routers = require('./route/user.route')
const app = express();


app.use(cors())
app.use(express.json())






app.use('/',Routers)

app.listen(3000,()=>console.log('server live on 3000'))
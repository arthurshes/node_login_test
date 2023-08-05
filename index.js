const express = require('express'),
app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const router = require('./routes/user.router')
app.use('/api/user',router)
const PORT = process.env.PORT || 8888

app.listen(PORT,()=>{
    console.log("server start port" + PORT)
})
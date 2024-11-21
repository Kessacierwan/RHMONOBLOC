const express = require("express")
const session = require('express-session')
const entrepriseRouter = require("./router/entrepriseRouter")
const employeRouter = require("./router/employeRouter")
const ordinateurRouter = require("./router/ordinateurRouter")
const taskRouter = require("./router/taskRouter")

require("dotenv").config()



const app = express()
app.use(express.static("./public"))
app.use(express.urlencoded({extended:true }))
app.use(session({
    secret: "kmr%2p~V3-s]RM3%#J-q6UM2=rW5yC88",
    resave: true,
    saveUninitialized: true,

}))


app.use(entrepriseRouter)
app.use(employeRouter)
app.use(ordinateurRouter)
app.use(taskRouter)

app.listen(process.env.PORT,()=>{
    console.log("connecté sur le port 3008")
})
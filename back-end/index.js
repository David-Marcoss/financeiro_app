require('dotenv').config();
const express = require("express")
const Routers = require("./src/routers/Router.js")
const path = require('path');
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

Routers(app)


app.listen(3002, () => {
    console.log("Servidor inicializado")
})
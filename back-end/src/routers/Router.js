const invoiceRouter = require("./invoiceRouter")

const Routers = app =>{
    app.use(
        invoiceRouter,
    )
}


module.exports = Routers
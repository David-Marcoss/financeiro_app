const express = require("express")
const invoiceController =  require("../controllers/invoiceController")
const upload = require('../middlewares/uploadFiles')

const invoiceRoute = express.Router()


invoiceRoute.get("/invoices/financial-indicators/:periodTime",invoiceController.getFinancialIndicators)
invoiceRoute.get("/invoices",invoiceController.findAll)
invoiceRoute.get("/invoices/:id",invoiceController.findOne)
invoiceRoute.put("/invoices/:id",invoiceController.update)
invoiceRoute.delete("/invoices/:id",invoiceController.delete)
invoiceRoute.post("/invoices",
    upload.fields([{ name: 'invoiceDocument' }, { name: 'bankSlipDocument' }]),
    invoiceController.create
)


module.exports = invoiceRoute
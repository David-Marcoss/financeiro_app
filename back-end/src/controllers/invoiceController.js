const prisma = require('../database/PrismaClient')
const path = require('path');

class invoiceController{

    async findAll(req, res) {
        try {
            const invoices = await prisma.invoice.findMany();
            
            // Adicione o caminho completo aos documentos PDF
            const updatedInvoices = invoices.map(invoice => ({
                ...invoice,
                invoiceDocument: `${req.protocol}://${req.get('host')}/uploads/${path.basename(invoice.invoiceDocument)}`,
                bankSlipDocument: `${req.protocol}://${req.get('host')}/uploads/${path.basename(invoice.bankSlipDocument)}`
            }));
    
            res.json(updatedInvoices);
        } catch (error) {
            console.error('Erro ao buscar as invoices:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    async findOne(req,res){
        const id = parseInt(req.params.id)

        if(id){
            const invoice = await prisma.invoice.findFirst({where: {id}})

            if(invoice){
                res.json(invoice)
            }else{
                res.status(404).json({error: "Invoice not found"})
            }
        }else{
            res.status(400).json({error: "Id not provided"})
        }
    }

    async create (req, res){
        const {
          payerName,
          issueDate,
          billingDate,
          paymentDate,
          amount,
          status
        } = req.body;
        
        try {
          // Verifique se os arquivos foram enviados corretamente
          if (!req.files || !req.files.invoiceDocument || !req.files.bankSlipDocument) {
            return res.status(400).json({ error: 'Missing required files' });
          }
    
          // Verifique se os outros campos obrigatórios foram enviados
          if (!payerName || !issueDate || !billingDate || !amount || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
    
          // Extraia os caminhos dos arquivos enviados
          const invoiceDocument = req.files.invoiceDocument[0].path;
          const bankSlipDocument = req.files.bankSlipDocument[0].path;
    
          const invoice = await prisma.invoice.create({
            data: {
              payerName,
              issueDate: new Date(issueDate),
              billingDate: new Date(billingDate),
              paymentDate: paymentDate ? new Date(paymentDate) : null,
              amount: parseFloat(amount),
              invoiceDocument,
              bankSlipDocument,
              status
            }
          });
          
          res.json(invoice);
    
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
    }
    

    async update(req,res){
        const id = parseInt(req.params.id)
        const data = req.body

        try{
            if(id){
                const invoice = await prisma.invoice.findFirst({where: {id}})
    
                if(invoice){
                    const updatedInvoice = await prisma.invoice.update({
                        where: {id},
                        data
                    })
                    res.json(updatedInvoice)
                }else{
                    res.status(404).json({error: "Invoice not found"})
                }
            }else{
                res.status(400).json({error: "Id not provided"})
            }
        }catch(error){
            res.status(500).json({error: "Internal server error"})
        }
    }

    async delete(req,res){
        const id = parseInt(req.params.id)

        if(id){
            if(await prisma.invoice.findFirst({where: {id}})){
                
                await prisma.invoice.delete({where: {id}})

                res.sendStatus(200)
            }else{
                res.status(404).json({error: "Invoice not found"})
            }
        }else{
            res.status(400).json({error: "Id not provided"})
        }
    }
    
    async getFinancialIndicators(req,res){
        const periodTime = req.params.periodTime

        let invoices = []

        if (!periodTime) {
            return res.status(400).json({ error: 'Missing periodTime query parameter' });
        
        } else if (periodTime === 'month') {

            invoices = await prisma.invoice.findMany({
                where: {
                  issueDate: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                  }
                }
            })
        
        } else if (periodTime === 'quarter') {
            // Get all invoices from the current quarter
            const currentMonth = new Date().getMonth();
            const startMonth = currentMonth - (currentMonth % 3);
            invoices = await prisma.invoice.findMany({
              where: {
                issueDate: {
                  gte: new Date(new Date().getFullYear(), startMonth, 1),
                  lt: new Date(new Date().getFullYear(), startMonth + 3, 1)
                }
              }
            });
          } else if (periodTime === 'year') {
            // Get all invoices from the current year
            invoices = await prisma.invoice.findMany({
              where: {
                issueDate: {
                  gte: new Date(new Date().getFullYear(), 0, 1),
                  lt: new Date(new Date().getFullYear() + 1, 0, 1)
                }
              }
            });
          }


        let totalIssued = 0;
        let totalNotBilled = 0;
        let totalOverdue = 0;
        let totalNotDue = 0;
        let totalPaid = 0;
    
        const today = new Date();
    
        invoices.forEach(invoice => {
            totalIssued += invoice.amount;
            
            if (invoice.status === 'ISSUED') {
                totalNotBilled += invoice.amount;
            }
        
            if (invoice.status === 'PAYMENT_OVERDUE') {
                totalOverdue += invoice.amount;
            }
        
            if (invoice.status === 'BILLING_DONE' && invoice.billingDate > today) {
                totalNotDue += invoice.amount;
            }
        
            if (invoice.status === 'PAYMENT_DONE') {
                totalPaid += invoice.amount;
            }
        });
    
        res.json({
            totalIssued,
            totalNotBilled,
            totalOverdue,
            totalNotDue,
            totalPaid
        });
    }

}

module.exports = new invoiceController
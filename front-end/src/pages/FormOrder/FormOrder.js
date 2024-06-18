import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalNavBar from '../../components/VerticalNavbar';
import HorizontalNavBar from '../../components/HorizontalNavBar';
import axios from 'axios';

function NotaForm() {
  const [nota, setNota] = useState({
    payerName: '',
    issueDate: '',
    billingDate: '',
    paymentDate: '',
    amount: '',
    invoiceDocument: null,
    bankSlipDocument: null,
    status: 'ISSUED'
  });

  useEffect(() => {
    // Gerar um número de identificação único
    setNota((prevNota) => ({
      ...prevNota,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNota((prevNota) => ({
      ...prevNota,
      [name]: files ? files[0] : value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const api_url = process.env.REACT_APP_API_URL;
      
      const formData = new FormData();
      formData.append('payerName', nota.payerName);
      formData.append('issueDate', nota.issueDate);
      formData.append('billingDate', nota.billingDate);
      formData.append('paymentDate', nota.paymentDate || '');
      formData.append('amount', nota.amount);
      formData.append('invoiceDocument', nota.invoiceDocument);
      formData.append('bankSlipDocument', nota.bankSlipDocument);
      formData.append('status', nota.status);

      console.log('formData', formData.invoiceDocument);

      await axios.post(`${api_url}/invoices`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Nota cadastrada com sucesso');
      navigate('/invoices');  // redirecione para uma página de sucesso se necessário

    } catch (error) {
      alert('Erro ao cadastrar a nota');
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <VerticalNavBar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <HorizontalNavBar />

          <div className="container mt-3" id='order-form'>
            <h2 className='text-center'>Cadastro de Notas</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome do Pagador</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="payerName" 
                  value={nota.payerName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
             
              <div className="mb-3">
                <label className="form-label">Data de Emissão</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="issueDate" 
                  value={nota.issueDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Data da Cobrança</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="billingDate" 
                  value={nota.billingDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Data do Pagamento</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="paymentDate" 
                  value={nota.paymentDate} 
                  onChange={handleChange} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Valor da Nota</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="amount" 
                  value={nota.amount} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Documento da Nota Fiscal (PDF)</label>
                <input 
                  type="file" 
                  className="form-control" 
                  name="invoiceDocument" 
                  onChange={handleChange} 
                  accept="application/pdf" 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Documento do Boleto Bancário (PDF)</label>
                <input 
                  type="file" 
                  className="form-control" 
                  name="bankSlipDocument" 
                  onChange={handleChange} 
                  accept="application/pdf" 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status da Nota</label>
                <select 
                  className="form-control" 
                  name="status" 
                  value={nota.status} 
                  onChange={handleChange} 
                  required
                >
                  <option value="ISSUED">Emitida</option>
                  <option value="BILLING_DONE">Cobrança realizada</option>
                  <option value="PAYMENT_OVERDUE">Pagamento em atraso</option>
                  <option value="PAYMENT_DONE">Pagamento realizado</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Cadastrar Nota</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default NotaForm;

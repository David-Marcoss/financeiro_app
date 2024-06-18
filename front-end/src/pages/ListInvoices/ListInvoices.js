import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VerticalNavBar from '../../components/VerticalNavbar';
import HorizontalNavBar from '../../components/HorizontalNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListInvoices.css';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
//import { Link } from "react-router-dom";

const NotesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterEmissionMonth, setFilterEmissionMonth] = useState('');
  const [filterCobrancaMonth, setFilterCobrancaMonth] = useState('');
  const [filterPagamentoMonth, setFilterPagamentoMonth] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchInvoices = async () => {

    const api_url = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(`${api_url}/invoices`);
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar as invoices:', error);
      setError('Erro ao buscar as invoices');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter(nota => {
    const emissionMonth = new Date(nota.issueDate).getMonth() + 1;
    const cobrancaMonth = new Date(nota.billingDate).getMonth() + 1;
    const pagamentoMonth = nota.paymentDate ? new Date(nota.paymentDate).getMonth() + 1 : '';
    
    return (
      (!filterEmissionMonth || emissionMonth === parseInt(filterEmissionMonth)) &&
      (!filterCobrancaMonth || cobrancaMonth === parseInt(filterCobrancaMonth)) &&
      (!filterPagamentoMonth || pagamentoMonth === parseInt(filterPagamentoMonth)) &&
      (!filterStatus || nota.status === filterStatus)
    );
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <VerticalNavBar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <HorizontalNavBar />
          <div className="mt-5">
            <h2 className="mb-4">Informações sobre invoices</h2>

            <div className="filters mb-4">
              <div className="row">
                <div className="col-md-3">
                  <label>Mês de Emissão</label>
                  <select 
                    className="form-control" 
                    value={filterEmissionMonth} 
                    onChange={e => setFilterEmissionMonth(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label>Mês de Cobrança</label>
                  <select 
                    className="form-control" 
                    value={filterCobrancaMonth} 
                    onChange={e => setFilterCobrancaMonth(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label>Mês de Pagamento</label>
                  <select 
                    className="form-control" 
                    value={filterPagamentoMonth} 
                    onChange={e => setFilterPagamentoMonth(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label>Status da Nota</label>
                  <select 
                    className="form-control" 
                    value={filterStatus} 
                    onChange={e => setFilterStatus(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="ISSUED">Emitida</option>
                    <option value="BILLING_DONE">Cobrança realizada</option>
                    <option value="PAYMENT_OVERDUE">Pagamento em atraso</option>
                    <option value="PAYMENT_DONE">Pagamento realizado</option>
                  </select>
                </div>
              </div>
            </div>

            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Nome do Pagador</th>
                  <th scope="col">Número da Nota</th>
                  <th scope="col">Data de Emissão</th>
                  <th scope="col">Data da Cobrança</th>
                  <th scope="col">Data do Pagamento</th>
                  <th scope="col">Valor da Nota</th>
                  <th scope="col">Nota Fiscal (PDF)</th>
                  <th scope="col">Boleto Bancário (PDF)</th>
                  <th scope="col">Status da Nota</th>
                  {/*
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                  */}
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((nota, index) => (
                  <tr key={index}>
                    <td>{nota.payerName}</td>
                    <td>{nota.invoiceNumber}</td>
                    <td>{new Date(nota.issueDate).toLocaleDateString()}</td>
                    <td>{new Date(nota.billingDate).toLocaleDateString()}</td>
                    <td>{nota.paymentDate ? new Date(nota.paymentDate).toLocaleDateString() : 'N/A'}</td>
                    <td>{nota.amount}</td>
                    <td>
                      <a href={nota.invoiceDocument} target="_blank" rel="noopener noreferrer">
                        Nota Fiscal
                      </a>
                    </td>
                    <td>
                      <a href={nota.bankSlipDocument} target="_blank" rel="noopener noreferrer">
                        Boleto Bancário
                      </a>
                    </td>
                    <td>{nota.status}</td>
                    {/* Ícone de Editar 
                    <td>
                      <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} />
                    </td>
                    */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesTable;

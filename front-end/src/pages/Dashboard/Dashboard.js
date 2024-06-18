import React, { useState, useEffect } from 'react';
import VerticalNavBar from '../../components/VerticalNavbar';
import HorizontalNavBar from '../../components/HorizontalNavBar';
import axios from 'axios';

const Dashboard = () => {
  const [filter, setFilter] = useState('month');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const api_url = process.env.REACT_APP_API_URL;

      try {
        let response;
        switch (filter) {
          case 'month':
            response = await axios.get(`${api_url}/invoices/financial-indicators/month`);
            break;
          case 'quarter':
            response = await axios.get(`${api_url}/invoices/financial-indicators/quarter`);
            break;
          case 'year':
            response = await axios.get(`${api_url}/invoices/financial-indicators/year`);
            break;
          default:
            response = {};
        }
        setData(response.data);
      } catch (err) {
        console.error('Erro ao buscar os dados:', err);
        setError('Erro ao buscar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

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
          <div className="container mt-5">
            <div className="row mb-4">
              <h1>Indicadores Financeiros</h1>
              <div className="col">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn btn-primary ${filter === 'month' ? 'active' : ''}`}
                    onClick={() => setFilter('month')}
                  >
                    Mês
                  </button>
                  <button
                    type="button"
                    className={`btn btn-primary ${filter === 'quarter' ? 'active' : ''}`}
                    onClick={() => setFilter('quarter')}
                  >
                    Trimestre
                  </button>
                  <button
                    type="button"
                    className={`btn btn-primary ${filter === 'year' ? 'active' : ''}`}
                    onClick={() => setFilter('year')}
                  >
                    Ano
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Notas Emitidas</h5>
                    <p className="card-text">Valor Total: {data.totalIssued.toFixed(2)} R$</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Notas emitidas sem ter a cobrança feita</h5>
                    <p className="card-text">Valor Total: {data.totalNotBilled.toFixed(2)} R$</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Notas vencidas - Inadimplência</h5>
                    <p className="card-text">Valor Total: {data.totalOverdue.toFixed(2)} R$</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Notas a Vencer</h5>
                    <p className="card-text">Valor Total: {data.totalNotDue.toFixed(2)} R$</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Notas Pagas</h5>
                    <p className="card-text">Valor Total: {data.totalPaid.toFixed(2)} R$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import Exchanges from './components/Exchanges';
import Homepage from './components/Homepage';
import News from './components/News';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='main'>
          <Layout>
            <div className='routes'>
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/exchanges' element={<Exchanges />} />
                <Route
                  path='/cryptocurrencies'
                  element={<Cryptocurrencies />}
                />
                <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                <Route path='/news' element={<News />} />
              </Routes>
            </div>
          </Layout>
        </div>
        <div className='footer'></div>
      </div>
    </BrowserRouter>
  );
};

export default App;

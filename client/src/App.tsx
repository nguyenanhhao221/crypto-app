import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import Exchanges from './components/Exchanges';
import Homepage from './components/Homepage';
import News from './components/News';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails';

const { Footer, Content, Sider } = Layout;
//TODO: Make error page for invalid route
const App = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Sider
            style={{
              minHeight: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              overflow: 'auto',
            }}
            width={232}
            collapsible
            breakpoint='md'
            collapsedWidth={80}
            onCollapse={(isCollapse) => setCollapse(isCollapse)}
          >
            <Navbar collapse={collapse} />
          </Sider>
          <Layout>
            <Content
              style={{
                padding: '1.5rem',
                marginLeft: `${collapse ? `80px` : `232px`}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                minHeight: '90vh',
              }}
            >
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/exchanges' element={<Exchanges />} />
                <Route
                  path='/cryptocurrencies'
                  element={<Cryptocurrencies simplified={false} />}
                />
                <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                <Route path='/news' element={<News simplified={false} />} />
              </Routes>
            </Content>
            <Footer className='footer' style={{ backgroundColor: '#001529' }}>
              <Typography.Title
                level={5}
                style={{ color: 'white', textAlign: 'center' }}
              >
                Cryptoverse <br />
                All rights reserved.
              </Typography.Title>
              <Space>
                <Link to='/'>Home</Link>
                <Link to='/exchanges'>Exchanges</Link>
                <Link to='/news'>News</Link>
              </Space>
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

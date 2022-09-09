import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

type Props = {};

const { Title } = Typography;

const Homepage = (props: Props) => {
  const { data, isFetching } = useGetCryptosQuery('');
  const globalStats = data?.data?.stats;

  if (isFetching) return <div>Loading...</div>;
  return (
    <div>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title='Total Cryptocurrencies'
            value={globalStats.totalCoins}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exchanges'
            value={globalStats.totalExchanges}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Market Cap'
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic title='Total Market' value={globalStats.totalMarkets} />
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;

import millify from 'millify';
import { Typography, Row, Col, Statistic, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

type Props = {};

const { Title } = Typography;

const Homepage = (props: Props) => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Spin size='large' className='loader' />;
  return (
    <>
      <div className='global-stats'>
        <Title level={2} className='heading'>
          Global Crypto Stats
        </Title>
        <Row justify='space-between'>
          <Col sm={12} xs={24}>
            <Statistic
              title='Total Cryptocurrencies'
              value={globalStats.totalCoins}
            />
          </Col>
          <Col sm={12} xs={24}>
            <Statistic
              title='Total Exchanges'
              value={globalStats.totalExchanges}
            />
          </Col>
        </Row>
        <Row justify='space-between'>
          <Col sm={12} xs={24}>
            <Statistic
              title='Total Market Cap'
              value={millify(globalStats.totalMarketCap)}
            />
          </Col>
          <Col sm={12} xs={24}>
            <Statistic
              title='Total 24h Volume'
              value={millify(globalStats.total24hVolume)}
            />
          </Col>
        </Row>
        <Row justify='space-between'>
          <Col sm={12} xs={24}>
            <Statistic title='Total Market' value={globalStats.totalMarkets} />
          </Col>
        </Row>
      </div>
      <div className='top-cryptos'>
        <div className='home-heading-container'>
          <Title level={2} style={{ margin: 0 }} className='home-title'>
            Top 10 Cryptocurrencies in the world
          </Title>
          <Title level={2} style={{ margin: 0 }} className='show-more'>
            <Link to='/cryptocurrencies'>Show more</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified />
      </div>
      <div className='news-cryptos'>
        <div className='home-heading-container'>
          <Title level={2} style={{ margin: 0 }} className='home-title'>
            Latest Crypto News
          </Title>
          <Title level={2} style={{ margin: 0 }} className='show-more'>
            <Link to='/news'>Show more</Link>
          </Title>
        </div>
        <News simplified />
      </div>
    </>
  );
};

export default Homepage;
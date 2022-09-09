import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

type Props = {};

const { Title } = Typography;

const Homepage = (props: Props) => {
  const { data, isFetching } = useGetCryptosQuery(50);
  const globalStats = data?.data?.stats;

  if (isFetching) return <div>Loading...</div>;
  return (
    <>
      <div className='global-stats'>
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
      <div className='top-cryptos'>
        <div className='home-heading-container'>
          <Title level={2} className='home-title'>
            Top 10 Cryptocurrencies in the world
          </Title>
          <Title level={3} className='show-more'>
            <Link to='/cryptocurrencies'>Show more</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified />
      </div>
      <div className='news-cryptos'>
        <div className='home-heading-container'>
          <Title level={2} className='home-title'>
            Latest Crypto News
          </Title>
          <Title level={3} className='show-more'>
            <Link to='/news'>Show more</Link>
          </Title>
        </div>
        <News />
      </div>
    </>
  );
};

export default Homepage;

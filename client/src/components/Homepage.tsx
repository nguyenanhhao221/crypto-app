import { Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import GlobalStats from './GlobalStats';
import { TGloBalStats } from '../type';

type Props = {};

const { Title } = Typography;

const Homepage = (props: Props) => {
  const { data, isFetching } = useGetCryptosQuery(10);
  if (isFetching) return <Spin size="large" className="loader" />;
  const globalStats: TGloBalStats = data?.data?.stats;
  return (
    <>
      <GlobalStats globalStats={globalStats} />
      <div className="top-cryptos">
        <div className="home-heading-container">
          <Title level={2} style={{ margin: 0 }} className="home-title">
            Top 10 Cryptocurrencies in the world
          </Title>
          <Title level={2} style={{ margin: 0 }} className="show-more">
            <Link to="/cryptocurrencies">Show more</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified />
      </div>
      <div className="news-cryptos">
        <div className="home-heading-container">
          <Title level={2} style={{ margin: 0 }} className="home-title">
            Latest Crypto News
          </Title>
          <Title level={2} style={{ margin: 0 }} className="show-more">
            <Link to="/news">Show more</Link>
          </Title>
        </div>
        <News simplified />
      </div>
    </>
  );
};

export default Homepage;

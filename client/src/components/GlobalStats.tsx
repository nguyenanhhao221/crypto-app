import millify from 'millify';
import { Typography, Row, Col, Statistic, Card, Button } from 'antd';
import { TBrands, TGloBalStats } from '../type';
import BrandBackLink from './BrandBackLink';
const { Title } = Typography;

type Props = {
  globalStats: TGloBalStats;
};

const GlobalStats = ({ globalStats }: Props) => {
  const coinRankingInfo: TBrands = {
    logo: require('../images/coinranking-logo.png'),
    name: 'Coin Ranking',
    url: 'https://coinranking.com',
  };
  return (
    <div className="global-stats">
      <div className="global-stats-heading-container">
        <Title level={2} className="heading">
          Global Crypto Stats
        </Title>
        <BrandBackLink brand={coinRankingInfo} />
      </div>
      <Row gutter={[16, 16]}>
        <Col sm={12} xs={24}>
          <Card>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.totalCoins}
            />
          </Card>
        </Col>
        <Col sm={12} xs={24}>
          <Card>
            <Statistic
              title="Total Exchanges"
              value={globalStats.totalExchanges}
            />
          </Card>
        </Col>
        <Col sm={12} xs={24}>
          <Card>
            <Statistic
              title="Total Market Cap"
              value={millify(Number(globalStats.totalMarketCap))}
            />
          </Card>
        </Col>
        <Col sm={12} xs={24}>
          <Card>
            <Statistic
              title="Total 24h Volume"
              value={millify(Number(globalStats.total24hVolume))}
            />
          </Card>
        </Col>
        <Col sm={12} xs={24}>
          <Card>
            <Statistic title="Total Market" value={globalStats.totalMarkets} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default GlobalStats;

import millify from 'millify';
import { Typography, Row, Col, Statistic, Card, Button } from 'antd';
import { TGloBalStats } from '../type';
const { Title } = Typography;

type Props = {
  globalStats: TGloBalStats;
};

const GlobalStats = ({ globalStats }: Props) => {
  const coinRankingLogo = require('../images/coinranking-logo.png');
  return (
    <div className="global-stats">
      <div className="global-stats-heading-container">
        <Title level={2} className="heading">
          Global Crypto Stats
        </Title>
        <Button
          type="link"
          title="Power by Coinranking"
          href="https://coinranking.com"
          target="_blank"
        >
          Power by
          <img
            className="refer-logo-brand"
            alt="Coin Ranking Logo"
            src={coinRankingLogo}
          />
        </Button>
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

import { Col, Row, Typography, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import millify from 'millify';
import { Chart, registerables, ChartOptions, ChartData } from 'chart.js';

import { Line } from 'react-chartjs-2';

type Props = { coinName: string; currentPrice: number; coinHistory: any };
type THistory = {
  price: string;
  timestamp: number;
};
//*Define type for Chart JS
interface TLineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}

const { Title } = Typography;
Chart.register(...registerables); //register for ChartJS V3

const LineChart = ({ coinName, currentPrice, coinHistory }: Props) => {
  const coinPrice: number[] = [];
  const coinTimeStamp: Array<string> = [];

  coinHistory?.data?.history?.forEach(({ price, timestamp }: THistory) => {
    //* We use unshift instead of push because later we need the correct order of these data so that the Chart can be draw correctly from left to right
    coinPrice.unshift(Number(price));
    coinTimeStamp.unshift(new Date(timestamp * 1000).toLocaleDateString());
    return;
  });

  const LineProps: TLineProps = {
    data: {
      labels: coinTimeStamp,
      datasets: [
        {
          label: `${coinName} Price in USD`,
          backgroundColor: '#0071bd',
          borderColor: '#0071bd',
          fill: false,
          data: coinPrice,
        },
      ],
    },
    options: {
      indexAxis: 'x',
      responsive: true,
    },
  };

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} Price Chart
        </Title>
        <Col>
          {coinHistory?.data?.change >= 0 ? (
            <Statistic
              value={coinHistory?.data?.change}
              prefix={<ArrowUpOutlined />}
              suffix='%'
              className='price-change'
              valueStyle={{ color: '#3f8600' }}
            ></Statistic>
          ) : (
            <Statistic
              value={coinHistory?.data?.change}
              prefix={<ArrowDownOutlined />}
              suffix='%'
              className='price-change'
              valueStyle={{ color: '#cf1322' }}
            ></Statistic>
          )}
          <Title level={5} className='current-price'>
            Current {coinName} Price: ${millify(currentPrice)}
          </Title>
        </Col>
      </Row>
      <Line data={LineProps.data} options={LineProps.options} />
    </>
  );
};

export default LineChart;

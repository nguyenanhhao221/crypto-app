import React, { useState } from 'react';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import millify from 'millify';

type Props = { simplified: boolean };
type T = {
  [key: string]: number | string;
};

const Cryptocurrencies = ({ simplified }: Props) => {
  //If simplified is true then display only top 10 currencies, if not display 100
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState<T[]>(data?.data?.coins);
  if (isFetching) return <div>Loading ...</div>;
  return (
    <>
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map(currency => (
          <Col key={currency.uuid} className='crypto-card'>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank} . ${currency.name}`}
                hoverable
                extra={
                  <img
                    src={`${currency.iconUrl}`}
                    alt={`${currency.name} icon`}
                    className='crypto-image'
                  />
                }
              >
                <p>Price: {millify(currency.price as number)}</p>
                <p>Market Cap: {millify(currency.marketCap as number)}</p>
                <p>Daily Change: {millify(currency.change as number)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;

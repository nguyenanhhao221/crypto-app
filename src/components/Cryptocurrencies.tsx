import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Spin } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import millify from 'millify';

type Props = { simplified: boolean };
type T = {
  [key: string]: number | string;
};

export interface TCrypto extends T {
  name: string;
}

const Cryptocurrencies = ({ simplified }: Props) => {
  //If simplified is true then display only top 10 currencies, if not display 100
  const count = simplified ? 10 : 100;
  const {
    data: cryptoList,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState<T[]>(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  //TODO implement redux to avoid useEffect complication
  useEffect(() => {
    if (!cryptoList) return;
    const filterData: T[] = cryptoList?.data?.coins.filter((coin: TCrypto) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filterData);
  }, [searchTerm, cryptoList]);

  if (isFetching && isLoading) return <Spin size='large' className='loader' />;
  // After finish fetching and loading, the component state (cryptos) might not been set correctly so we add the below statement to make sure the internal state get set properly with the data return from API

  if (!cryptos && isSuccess) {
    setCryptos(cryptoList.data.coins);
  }

  return (
    <>
      {/* Add search box only when not in simplified  */}
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search Cryptocurrencies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col
            xxl={24 / 8}
            xl={24 / 4}
            lg={24 / 3}
            md={24 / 2}
            key={currency.uuid}
            className='crypto-card'
          >
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

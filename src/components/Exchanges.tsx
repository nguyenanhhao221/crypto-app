import React from 'react';
import { Spin } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoExchangeApi';
import ExchangeCard from './ExchangeCard';

type Props = {};

const Exchanges = (props: Props) => {
  const {
    data: allExchanges,
    isFetching,
    isError,
    error,
  } = useGetExchangesQuery(undefined);
  if (isFetching && !allExchanges)
    return <Spin size='large' className='loader' />;
  if (isError) return <div>{`Error: ${error.toString()}`}</div>;
  return (
    <div className='exchanges-container'>
      {allExchanges?.map((exchange) => (
        <ExchangeCard exchange={exchange} key={exchange.id} />
      ))}
    </div>
  );
};

export default Exchanges;

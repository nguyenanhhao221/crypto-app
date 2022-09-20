import React from 'react';
import { useGetExchangesQuery } from '../services/cryptoExchangeApi';

type Props = {};

const Exchanges = (props: Props) => {
  const { data, isFetching, isLoading } = useGetExchangesQuery(undefined);
  console.log('🚀 ~ Exchanges ~ data', data);
  return <div>Exchanges</div>;
};

export default Exchanges;

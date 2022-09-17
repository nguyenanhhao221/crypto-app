import { Select, Typography, Row, Col, Avatar, Card, Spin } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { TCrypto } from '../components/Cryptocurrencies';
const { Text, Title } = Typography;
const { Option } = Select;

//Demo image used incase the API doesn't provide any display image
const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'; //TODO: FIX
const { Meta } = Card;
type Props = {
  simplified: boolean;
};

//Define the type for News return from API to use in Map method. If any changes for property by the APIs the Type needs to be update correctly
type TNewsImage = {
  image?: {
    thumbnail: {
      contentUrl: string;
    };
  };
  name?: string;
};
interface TNews extends TNewsImage {
  value: string;
  name: string;
  url: string;
  description: string;
  datePublished: string;
  provider: TNewsImage[];
}

const News = ({ simplified }: Props) => {
  const [newCategory, setNewCategory] = useState('Cryptocurrencies');
  //Call the cryptoNewsApi
  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newCategory: newCategory,
    count: simplified ? 6 : 12, //if in simplified mode display 6 news article only
  });

  //Call the crypto api
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Spin size='large' className='loader' />;
  //Base on the News return from the API render out the articles
  return (
    <Row gutter={[24, 24]}>
      {/* Display search box to filter topic */}
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            allowClear
            placeholder='Search Crypto Topics'
            onChange={(value) => setNewCategory(value)}
            optionFilterProp='children' //which props of the Option to be used when filter, the children props is equal to the string between the <Option> </Option>
            //filterOption take a function with 2 parameter. input is the input user type in search box, option represent the Option tag
            //When user type in the search box, it will run a filter function and filter out the matched result
            filterOption={(input, option) => {
              return (
                (option!.children as unknown as string) // "!" meaning is a trick that we only use when we know that variable for sure not undefined or null, here option maybe undefined but we tell TS that we know it will not
                  //when access the children property of option we also use "as unknown" "as string" this mean that we tell TS to reset the type of option.children and reassign that to string, because the default type of option.children is set as Omit<DefaultOptionType, "children">[] | undefined
                  .toLowerCase()
                  .includes(input.toLowerCase())
              );
            }}
          >
            <Option value='Cryptocurrencies'>Cryptocurrencies</Option>
            {data?.data?.coins.map((coin: TCrypto, index: number) => (
              <Option value={coin.name} key={index}>
                {/* This is the children props of each option */}
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}

      {/* Display article about crypto */}
      {cryptoNews?.value.map((news: TNews, i: number) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <a href={news.url} target='_blank' rel='noreferrer'>
            <Card
              hoverable
              className='news-card'
              style={{ minHeight: '450px', maxHeight: 'min-content' }}
            >
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt={'news'}
                  className='news-image'
                />
              </div>
              {/* If the length of the description is more than 100 word, display only the first 100 words */}
              <p className='news-description'>
                {news.description.length > 100
                  ? `${news.description.split(' ').splice(0, 100).join(' ')} `
                  : news.description}
              </p>
              <Meta
                title={
                  <Text className='provider-name'>
                    {news.provider[0]?.name}
                  </Text>
                }
                avatar={
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt={`${news.provider[0]?.name} logo`}
                    style={{ marginLeft: '0.5rem' }}
                  ></Avatar>
                }
                description={
                  <Text>
                    {/* Moment is used to display how long ago from the date published */}
                    {moment(news.datePublished).startOf('seconds').fromNow()}
                  </Text>
                }
              />
            </Card>
          </a>
        </Col>
      ))}
    </Row>
  );
};

export default News;

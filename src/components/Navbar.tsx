import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons';

type Props = {};
//new meneItems to display children for antd design
const menuItems = [
  {
    label: <Link to='/'>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to='/cryptocurrencies'>Cryptocurrencies</Link>,
    key: 'Cryptocurrencies',
    icon: <FundOutlined />,
  },
  {
    label: <Link to='/exchanges'>Exchanges</Link>,
    key: 'exchanges',
    icon: <MoneyCollectOutlined />,
  },
  {
    label: <Link to='/news'>News</Link>,
    key: 'news',
    icon: <BulbOutlined />,
  },
];
const Navbar = (props: Props) => {
  const icon = require('../images/cryptocurrency.png'); //use require here because of typescript and images module.
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='Logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu theme='dark' items={menuItems} />
    </div>
  );
};

export default Navbar;

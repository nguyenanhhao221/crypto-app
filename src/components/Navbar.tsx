import React from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
} from '@ant-design/icons';

type Props = { collapse: boolean };
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
const Navbar = ({ collapse }: Props) => {
  const icon = require('../images/cryptocurrency.png'); //use require here because of typescript and images module.
  return (
    <>
      <div className='logo-container'>
        <Avatar src={icon} size='large' alt='logo' />
        <Typography.Title
          level={2}
          className='Logo'
          style={{ marginBottom: 0, display: `${collapse ? `none` : `block`}` }}
        >
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu theme='dark' items={menuItems} defaultSelectedKeys={['home']} />
    </>
  );
};

export default Navbar;

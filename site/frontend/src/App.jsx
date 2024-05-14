import React, { useEffect, useState } from 'react';
import { Flex, Radio } from 'antd';
import MenuCard from './components/MenuCard';

const boxStyle = {
  width: '100%',
  height: 512,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

const App = () => {
  return (
    <>
      <MenuCard></MenuCard>
    </>
  );
};

export default App;
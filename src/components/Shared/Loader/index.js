import React from 'react';
import { ActivityIndicator } from 'react-native';

import * as S from './styled';

const Loader = () => {
  return (
    <S.Container>
      <ActivityIndicator size="large" color="#000" />
    </S.Container>
  );
};

export default Loader;

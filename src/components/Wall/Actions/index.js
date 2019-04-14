import React from 'react';

import * as S from './styled';

const Actions = ({ onAccept, onDismiss }) => {
  return (
    <S.Wrapper>
      <S.Button onPress={onAccept}>
        <S.Text>Yay!</S.Text>
      </S.Button>
      <S.Button onPress={onDismiss}>
        <S.Text>Nope</S.Text>
      </S.Button>
    </S.Wrapper>
  );
};

export default Actions;

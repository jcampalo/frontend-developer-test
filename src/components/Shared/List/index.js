import React, { PureComponent } from 'react';

import * as S from './styled';

class List extends PureComponent {
  handleScrollEnd = (e) => {
    const { onIndexChange } = this.props;
    const {
      contentOffset, layoutMeasurement, contentSize
    } = e.nativeEvent;
    const size = contentSize.width / layoutMeasurement.width;
    const index = contentOffset.x * size / contentSize.width;

    if (onIndexChange) {
      onIndexChange({
        index
      });
    }
  }

  render() {
    const {
      data,
      renderItem,
    } = this.props;

    return (
      <S.List
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={this.handleScrollEnd}
      >
        {data.map((item, index) => renderItem({ index, item }))}
      </S.List>
    );
  }
}

export default List;

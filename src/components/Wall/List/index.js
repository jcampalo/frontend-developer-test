import React, { PureComponent, createRef } from 'react';

import Layout from '../../../constants/Layout';
import Element from './Element';
import * as S from './styled';

class List extends PureComponent {
  listRef = createRef();

  getItemLayout = (data, index) => ({
    length: Layout.window.width,
    offset: Layout.window.width * index,
    index
  })

  handleAnimationFinish = () => {
    const { onDelete } = this.props;

    if (onDelete) {
      onDelete();
    }
  }

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

  renderItem = ({ item }) => {
    const {
      id,
      key,
      info,
      photos,
      isAccepted,
      isDismissed,
    } = item;

    return (
      <Element
        index={key}
        id={id}
        info={info}
        photos={photos}
        shouldDelete={isDismissed || isAccepted}
        onAntimationFinish={this.handleAnimationFinish}
      />
    );
  }

  render() {
    const {
      users,
    } = this.props;

    return (
      <S.List
        ref={this.listRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={1}
        data={users}
        renderItem={this.renderItem}
        getItemLayout={this.getItemLayout}
        onMomentumScrollEnd={this.handleScrollEnd}
      />
    );
  }
}

export default List;

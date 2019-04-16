import React, { Fragment, PureComponent } from 'react';

import List from '../../Shared/List';
import Element from './Element';

class WallList extends PureComponent {
  renderItem = ({
    item
  }) => {
    const {
      key,
      info,
      photos,
      isDismissed,
      isAccepted,
    } = item;

    return (
      <Element
        isDeleted={isDismissed || isAccepted}
        key={key}
        index={key}
        info={info}
        photos={photos}
      />
    );
  }

  render() {
    const {
      users,
      onIndexChange,
    } = this.props;

    return (
      <Fragment>
        <List
          data={users}
          renderItem={this.renderItem}
          onIndexChange={onIndexChange}
        />
      </Fragment>
    );
  }
}

export default WallList;

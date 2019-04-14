import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from '../../../store/injectReducer';
import { KEY } from './constants';
import reducer from './reducer';
import {
  setCurrent,
  dismiss,
  accept,
  deleteCurrent,
} from './actions';
import {
  selectCurrent,
  selectUsers,
} from './selectors';

class Profiles extends PureComponent {
  handleAccept = () => {
    const { current, onAccept } = this.props;

    onAccept(current);
  }

  handleDelete = () => {
    const {
      users, current, onDelete
    } = this.props;
    const { key } = users.reduce((acc, user) => {
      if (acc.isFound) {
        if (!acc.key) {
          acc.key = user.key;
        }
      } else {
        acc.isFound = user.key === current.key;
      }

      return acc;
    }, {
      isFound: false,
    });

    onDelete({ ...current, nextKey: key });
  }

  handleDismiss = () => {
    const { current, onDismiss } = this.props;

    onDismiss(current);
  }

  handleIndexChange = ({ index }) => {
    const { users, onIndexChange } = this.props;
    const { key, id } = users[index];

    onIndexChange({ key, id });
  }

  render() {
    const { children, ...props } = this.props;

    return children({
      ...props,
      onAccept: this.handleAccept,
      onDelete: this.handleDelete,
      onDismiss: this.handleDismiss,
      onIndexChange: this.handleIndexChange,
    });
  }
}

export const mapDispatchToProps = dispatch => ({
  onIndexChange: (payload) => {
    dispatch(setCurrent(payload));
  },
  onAccept: (payload) => {
    dispatch(accept(payload));
  },
  onDismiss: (payload) => {
    dispatch(dismiss(payload));
  },
  onDelete: (payload) => {
    dispatch(deleteCurrent(payload));
  }
});

const mapStateToProps = createStructuredSelector({
  current: selectCurrent(),
  users: selectUsers(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: KEY, reducer });

export default compose(
  withReducer,
  withConnect,
)(Profiles);

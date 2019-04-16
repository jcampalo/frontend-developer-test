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
  selectIsEmpty,
  selectUsers,
} from './selectors';

class Profiles extends PureComponent {
  handleAccept = () => {
    const { current, onAccept } = this.props;

    onAccept(current);
  }

  handleDelete = () => {
    const {
      current, onDelete
    } = this.props;

    onDelete(current);
  }

  handleDismiss = () => {
    const { current, onDismiss } = this.props;

    onDismiss(current);
  }

  render() {
    const { children, ...props } = this.props;

    return children({
      ...props,
      onAccept: this.handleAccept,
      onDelete: this.handleDelete,
      onDismiss: this.handleDismiss,
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
  isEmpty: selectIsEmpty(),
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

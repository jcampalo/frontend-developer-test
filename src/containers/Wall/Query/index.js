import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from '../../../store/injectReducer';
import injectEpic from '../../../store/injectEpic';
import { KEY } from './constants';
import reducer from './reducer';
import epic from './epics';
import { fetch } from './actions';
import {
  selectData,
  selectError,
  selectIsLoading,
} from './selectors';

class Query extends PureComponent {
  componentDidMount() {
    const { pathname, onMount } = this.props;

    onMount({
      url: pathname,
    });
  }

  render() {
    const { children, ...props } = this.props;

    return children(props);
  }
}

export const mapDispatchToProps = dispatch => ({
  onMount: (payload) => {
    dispatch(fetch(payload));
  },
});

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  error: selectError(),
  isLoading: selectIsLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: KEY, reducer });
const withEpic = injectEpic({ key: KEY, epic });

export default compose(
  withReducer,
  withEpic,
  withConnect,
)(Query);

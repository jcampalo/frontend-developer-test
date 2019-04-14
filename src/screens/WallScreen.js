import React, { PureComponent, Fragment } from 'react';
import { ActivityIndicator } from 'react-native';

import QueryContainer from '../containers/Wall/Query';
import ProfilesContainer from '../containers/Wall/Profiles';
import EmptyList from '../components/Wall/EmptyList';
import List from '../components/Wall/List';
import Actions from '../components/Wall/Actions';

class WallScreen extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <QueryContainer>
        {({
          isLoading,
          error,
        }) => {
          if (isLoading) {
            return (
              <ActivityIndicator size="small" color="#000" />
            );
          }

          if (error) {
            return null;
          }

          return (
            <ProfilesContainer>
              {({
                users,
                onDismiss,
                onAccept,
                onIndexChange,
                onDelete
              }) => {
                if (!users) {
                  return (
                    <EmptyList />
                  );
                }

                return (
                  <Fragment>
                    <List users={users} onIndexChange={onIndexChange} onDelete={onDelete} />
                    <Actions onDismiss={onDismiss} onAccept={onAccept} />
                  </Fragment>
                );
              }}
            </ProfilesContainer>
          );
        }}
      </QueryContainer>
    );
  }
}

export default WallScreen;

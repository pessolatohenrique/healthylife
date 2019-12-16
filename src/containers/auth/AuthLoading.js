import React from 'react';
import { AsyncStorage } from 'react-native';

import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import commonStyle from '../../utils/commonStyle';
import CustomLoader from '../../components/CustomLoader';
import { configureAxios } from '../../config/axios';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.fetchToken();
  }

  // Fetch the token from storage then navigate to our appropriate place
  fetchToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const { navigation } = this.props;

    await configureAxios();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userToken ? 'Dashboard' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container style={commonStyle.containerRowCenter}>
        <Content>
          <CustomLoader isLoading />
        </Content>
      </Container>
    );
  }
}

AuthLoading.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AuthLoading;

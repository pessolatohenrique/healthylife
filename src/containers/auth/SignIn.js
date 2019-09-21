import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  Container, Content, Button, Text, Body,
} from 'native-base';
import PropTypes from 'prop-types';
import commonStyle from '../../utils/commonStyle';

class SignIn extends Component {
  login = async () => {
    const { navigation } = this.props;
    await AsyncStorage.setItem('token', 'abc');
    navigation.navigate('App');
  };

  render() {
    return (
      <Container style={commonStyle.containerRowCenter}>
        <Content>
          <Body>
            <Button onPress={this.login} info>
              <Text>Login!</Text>
            </Button>
          </Body>
        </Content>
      </Container>
    );
  }
}

SignIn.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignIn;

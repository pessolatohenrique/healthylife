import React, { Component } from 'react';
import {
 AsyncStorage, Image, View, Keyboard 
} from 'react-native';
import {
 Item, Input, Text, Button 
} from 'native-base';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import commonStyle from '../../utils/commonStyle';
import CustomLoader from '../../components/CustomLoader';
import ViewBackground from '../../components/ViewBackground';
import { login } from './functions';
import { showToast } from '../../utils/errors';
import { REQUIRED_MESSAGE } from '../../constants/general';

class SignIn extends Component {
  componentDidUpdate = (prevProps) => {
    const { errors } = this.props;
    if (prevProps.errors.message !== errors.message && errors.message) {
      showToast(errors.message);
    }
  };

  render() {
    const {
      values,
      setFieldValue,
      handleSubmit,
      isSubmitting,
      errors,
    } = this.props;
    const { username, password } = values;
    return (
      <ViewBackground>
        <View
          style={[commonStyle.containerCenter, commonStyle.containerMargin]}
        >
          <Image
            style={{ width: '98%', height: 150 }}
            resizeMode="contain"
            source={require('../../../assets/imgs/logo.png')}
          />

          <CustomLoader isLoading={isSubmitting} />

          <Item regular>
            <Input
              placeholder="Usuário"
              style={commonStyle.regularInput}
              value={username}
              onChangeText={text => setFieldValue('username', text)}
            />
          </Item>
          {errors.username && (
            <Text style={commonStyle.error}>{errors.username}</Text>
          )}

          <Item regular>
            <Input
              placeholder="Senha"
              style={commonStyle.regularInput}
              type="password"
              value={password}
              secureTextEntry
              onChangeText={text => setFieldValue('password', text)}
              onSubmitEditing={handleSubmit}
            />
          </Item>
          {errors.password && (
            <Text style={commonStyle.error}>{errors.password}</Text>
          )}

          <Button block success onPress={handleSubmit} disabled={isSubmitting}>
            <Text>Login</Text>
          </Button>
        </View>
      </ViewBackground>
    );
  }
}

SignIn.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required(REQUIRED_MESSAGE),
    password: Yup.string().required(REQUIRED_MESSAGE),
  }),

  handleSubmit: async (values, actions) => {
    const { username, password } = values;
    const { props } = actions;
    const { navigation } = props;

    Keyboard.dismiss();

    const response = await login(username, password);

    actions.setSubmitting(false);

    if (response.error) {
      actions.setErrors({ message: response.error });
      return false;
    }

    await AsyncStorage.setItem('token', response);
    navigation.navigate('App');
    return true;
  },
})(SignIn);

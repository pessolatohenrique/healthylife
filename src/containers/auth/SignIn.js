import React, { Component } from 'react';
import { AsyncStorage, Image, View } from 'react-native';
import {
  Container, Content, Form, Item, Input, Label, Text, Button,
} from 'native-base';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import commonStyle from '../../utils/commonStyle';
import CustomLoader from '../../components/CustomLoader';
import ViewBackground from '../../components/ViewBackground';

class SignIn extends Component {
  login = async () => {
    const { navigation } = this.props;
    await AsyncStorage.setItem('token', 'abc');
    navigation.navigate('App');
  };

  render() {
    const {
      values, setFieldValue, handleSubmit, isSubmitting, errors,
    } = this.props;
    const { username, password } = values;
    return (
      <ViewBackground>
        <View style={[commonStyle.containerCenter, commonStyle.containerMargin]}>
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
          {errors.username && <Text style={commonStyle.error}>{errors.username}</Text>}

          <Item regular>
            <Input
              placeholder="Senha"
              style={commonStyle.regularInput}
              type="password"
              value={password}
              secureTextEntry
              onChangeText={text => setFieldValue('password', text)}
            />
          </Item>
          {errors.password && <Text style={commonStyle.error}>{errors.password}</Text>}

          <Button block success onPress={handleSubmit} disabled={isSubmitting}>
            <Text>Login</Text>
          </Button>
        </View>
      </ViewBackground>
    );
  }
}

SignIn.propTypes = {
  navigation: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Campo de preenchimento obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Campo de preenchimento obrigatório'),
  }),

  handleSubmit: (values, actions) => {
    setTimeout(() => {
      console.tron.log('Values from form', values);
      actions.setSubmitting(false);
      actions.setErrors({ message: 'Demonstrando erros no formik' });
    }, 1000);
  },
})(SignIn);

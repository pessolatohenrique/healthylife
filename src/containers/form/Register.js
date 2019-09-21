import React from 'react';
import {
  Container, Content, Form, Item, Input, Label, Text, Button,
} from 'native-base';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import CustomLoader from '../../components/CustomLoader';
import CommonStyle from '../../utils/commonStyle';

const FormComponent = (props) => {
  const {
    values, setFieldValue, handleSubmit, isSubmitting, errors,
  } = props;
  const { username, password } = values;
  return (
    <Container>
      <Content padder>
        <CustomLoader isLoading={isSubmitting} />
        <Form>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input value={username} onChangeText={text => setFieldValue('username', text)} />
          </Item>
          {errors.username && <Text style={CommonStyle.error}>{errors.username}</Text>}

          <Item stackedLabel last>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              secureTextEntry
              onChangeText={text => setFieldValue('password', text)}
            />
          </Item>
          {errors.password && <Text style={CommonStyle.error}>{errors.password}</Text>}

          <Button block success onPress={handleSubmit} disabled={isSubmitting}>
            <Text>Save</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

FormComponent.propTypes = {
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
})(FormComponent);

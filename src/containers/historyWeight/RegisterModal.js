import React, { Component } from 'react';
import {
 Text, View, Button, Item, Input 
} from 'native-base';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import commonStyle from '../../utils/commonStyle';
import { verifyValidateDecimal } from '../../utils/formatters';
import styles from './styles';

class RegisterModal extends Component {
  render() {
    const {
      visible,
      onClose,
      values,
      setFieldValue,
      handleSubmit,
      isSubmitting,
      errors,
    } = this.props;
    const { weight } = values;
    return (
      <View>
        <Modal
          isVisible={visible}
          wipeDirection={['up', 'left', 'right', 'down']}
          style={commonStyle.modalBottom}
        >
          <View style={commonStyle.modalContent}>
            <Text style={commonStyle.colorTheme}>Registrar</Text>
            {errors.weight && (
              <Text style={commonStyle.error}>{errors.weight}</Text>
            )}

            <Item regular style={styles.weightField}>
              <Input
                placeholder="Peso"
                // style={[commonStyle.fieldWidth, commonStyle.fieldMargin, styles.weightField]}
                value={weight}
                onChangeText={text => setFieldValue('weight', text)}
              />
            </Item>

            <View style={commonStyle.containerRow}>
              <Button
                success
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={[commonStyle.fieldMargin]}
              >
                <Text>Adicionar</Text>
              </Button>

              <Button danger onPress={onClose}>
                <Text>Cancelar</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

RegisterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({ weight: '' }),
  validationSchema: Yup.object().shape({
    weight: Yup.string().required('O campo peso é obrigatório'),
  }),
  handleSubmit: async (values, actions) => {
    const { weight } = values;

    if (!verifyValidateDecimal(weight)) {
      actions.setFieldError('weight', 'O campo peso está no formato inválido');
      actions.setSubmitting(false);
      return false;
    }

    actions.props.onClose();
    actions.setSubmitting(false);

    return true;
  },
})(RegisterModal);

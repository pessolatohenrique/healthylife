import React, { Component } from 'react';
import { Text, View, Button } from 'native-base';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import commonStyle from '../../utils/commonStyle';
import { getDifferenceInDays } from '../../utils/calendar';
import styles from './styles';

class SearchModal extends Component {
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
    const { date_initial, date_final } = values;
    return (
      <View>
        <Modal
          isVisible={visible}
          wipeDirection={['up', 'left', 'right', 'down']}
          style={commonStyle.modalBottom}
        >
          <View style={commonStyle.modalContent}>
            <Text style={commonStyle.colorTheme}>Pesquisar</Text>
            {errors.date_initial && (
              <Text style={commonStyle.error}>{errors.date_initial}</Text>
            )}

            {errors.date_final && (
              <Text style={commonStyle.error}>{errors.date_final}</Text>
            )}

            <View style={[commonStyle.containerRow, styles.searchContainer]}>
              <DatePicker
                style={[commonStyle.fieldWidth, commonStyle.fieldMargin]}
                date={date_initial}
                mode="date"
                placeholder="Data inicial"
                format="DD/MM/YYYY"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showIcon={false}
                onDateChange={date => setFieldValue('date_initial', date)}
              />

              <DatePicker
                style={[commonStyle.fieldWidth]}
                date={date_final}
                mode="date"
                placeholder="Data final"
                format="DD/MM/YYYY"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showIcon={false}
                onDateChange={date => setFieldValue('date_final', date)}
              />
            </View>

            <View style={commonStyle.containerRow}>
              <Button
                success
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={[commonStyle.fieldMargin]}
              >
                <Text>Pesquisar</Text>
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

SearchModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({ date_initial: '', date_final: '' }),
  validationSchema: Yup.object().shape({
    date_initial: Yup.string().required('O campo data inicial é obrigatório'),
    date_final: Yup.string().required('O campo data final é obrigatório'),
  }),
  handleSubmit: async (values, actions) => {
    const { date_initial, date_final } = values;

    const difference = getDifferenceInDays(
      moment(date_initial, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      moment(date_final, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    );

    if (difference < 0) {
      actions.setFieldError(
        'date_initial',
        'A data inicial deve ser menor que a final',
      );
      actions.setSubmitting(false);
      return false;
    }

    actions.props.onClose();
    actions.setSubmitting(false);

    return true;
  },
})(SearchModal);

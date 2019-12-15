import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import commonStyle from '../../utils/commonStyle';

class SearchModal extends Component {
  render() {
    const { visible, onClose } = this.props;
    return (
      <View>
        <Modal
          isVisible={visible}
          wipeDirection={['up', 'left', 'right', 'down']}
          style={commonStyle.modalBottom}
        >
          <View style={commonStyle.modalContent}>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={onClose} />
          </View>
        </Modal>
      </View>
    );
  }
}

SearchModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchModal;

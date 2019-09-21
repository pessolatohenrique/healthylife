import React, { Component } from 'react';
import { Fab, View, Button } from 'native-base';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

class FabExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'false',
    };
  }

  render() {
    const { active } = this.state;
    const { onAdd, onDelete } = this.props;

    return (
      <View>
        <Fab
          active={active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !active })}
        >
          <Icon name="toolbox" />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={onAdd}>
            <Icon name="plus" color="white" />
          </Button>
          <Button style={{ backgroundColor: '#DD5144' }} onPress={onDelete}>
            <Icon name="trash" color="white" />
          </Button>
        </Fab>
      </View>
    );
  }
}

FabExample.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FabExample;

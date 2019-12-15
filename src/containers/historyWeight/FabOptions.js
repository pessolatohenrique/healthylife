import React, { Component } from 'react';
import { Fab, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MAIN_COLOR } from '../../constants/general';
import commonStyle from '../../utils/commonStyle';

class FabOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  toggleActive = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  render() {
    const { active } = this.state;
    return (
      <View>
        <Fab
          active={active}
          direction="up"
          containerStyle={{}}
          style={commonStyle.fabMain}
          position="bottomRight"
          onPress={() => this.toggleActive()}
        >
          <Icon name="bars" />

          <Button style={commonStyle.fabSub}>
            <Icon name="search" size={15} />
          </Button>
          <Button style={commonStyle.fabSub}>
            <Icon name="plus" size={15} />
          </Button>
        </Fab>
      </View>
    );
  }
}

export default FabOptions;

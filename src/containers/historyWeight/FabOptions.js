import React, { Component } from "react";
import { Fab, View, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";
import commonStyle from "../../utils/commonStyle";

class FabOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggleActive = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  render() {
    const { active } = this.state;
    const { onSearch, onShowRegister } = this.props;
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

          <Button style={commonStyle.fabSub} onPress={() => onSearch(true)}>
            <Icon name="search" size={15} />
          </Button>
          <Button
            style={commonStyle.fabSub}
            onPress={() => onShowRegister(true)}
          >
            <Icon name="plus" size={15} />
          </Button>
        </Fab>
      </View>
    );
  }
}

FabOptions.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onShowRegister: PropTypes.func.isRequired
};

export default FabOptions;

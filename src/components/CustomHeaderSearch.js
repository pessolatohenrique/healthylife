import React, { Component } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

import {
  Header, Body, Right, Button, Title,
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';

import commonStyle from '../utils/commonStyle';
import CustomSearch from './CustomSearch';

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { flagSearch: false };
  }

  setFlagSearch = (flagSearch) => {
    this.setState({ flagSearch });
  };

  render() {
    const { title, navigation } = this.props;
    const { flagSearch } = this.state;

    if (flagSearch) {
      return <CustomSearch onSetFlag={this.setFlagSearch} navigation={navigation} />;
    }

    return (
      <View style={commonStyle.priorirty}>
        <Header style={[commonStyle.header, commonStyle.headerCustomPadding]}>
          <Body>
            <Title style={commonStyle.fontBold}>{title}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.setFlagSearch(true)}>
              <Icon name="search" size={18} color="white" />
            </Button>
          </Right>
        </Header>
      </View>
    );
  }
}

CustomHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default CustomHeader;

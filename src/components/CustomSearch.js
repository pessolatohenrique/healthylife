import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Header, Item, Input, Button, Text,
} from 'native-base';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import commonStyle from '../utils/commonStyle';

class CustomSearch extends Component {
  setSearch = (text) => {
    const { navigation } = this.props;
    navigation.setParams({ search: text });
  };

  render() {
    const { onSetFlag } = this.props;
    return (
      <View style={commonStyle.priorirty}>
        <Header searchBar rounded style={[commonStyle.header, commonStyle.headerCustomPadding]}>
          <Item style={[commonStyle.searchPadding]}>
            <Button
              transparent
              onPress={() => {
                this.setSearch('');
                onSetFlag(false);
              }}
            >
              <Icon name="arrow-left" size={20} />
            </Button>
            <Input
              placeholder="Search"
              style={[commonStyle.searchPadding]}
              onChangeText={text => this.setSearch(text)}
            />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </View>
    );
  }
}

CustomSearch.propTypes = {
  navigation: PropTypes.object.isRequired,
  onSetFlag: PropTypes.func.isRequired,
};

export default CustomSearch;

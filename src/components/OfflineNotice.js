import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import commonStyle from '../utils/commonStyle';

const styles = StyleSheet.create({
  noticeContainer: {
    backgroundColor: '#b52424',
    height: 30,
    marginBottom: 5,
  },
  noticeText: {
    color: 'white',
  },
});

class OfflineNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  };

  render() {
    const { isConnected } = this.state;

    // console.tron.log('is connected', isConnected);

    if (!isConnected) {
      return (
        <View style={[commonStyle.containerRowCenter, styles.noticeContainer]}>
          <Text style={styles.noticeText}>
            O app está definido como offline no momento
          </Text>
        </View>
      );
    }

    return <View />;
  }
}

export default OfflineNotice;

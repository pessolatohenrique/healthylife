/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStatus } from '../actions/connection';

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
    this.state = {};
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
    const { onSetStatus } = this.props;
    onSetStatus(isConnected);
  };

  render() {
    const { connection } = this.props;

    if (!connection.status) {
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

OfflineNotice.propTypes = {
  onSetStatus: PropTypes.func.isRequired,
  connection: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  connection: state.connection,
});

const mapDispatchToProps = dispatch => ({
  onSetStatus: status => dispatch(setStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfflineNotice);

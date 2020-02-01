/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setStatus } from "../actions/connection";

import commonStyle from "../utils/commonStyle";

const styles = StyleSheet.create({
  noticeContainer: {
    backgroundColor: "#17a2b8",
    height: 30,
    marginBottom: 5
  },
  noticeText: {
    color: "white"
  }
});

const SyncNotice = props => {
  const { isSynchronizing } = props;

  if (isSynchronizing) {
    return (
      <View style={[commonStyle.containerRowCenter, styles.noticeContainer]}>
        <Text style={styles.noticeText}>
          Existem dados nesta aba sendo sincronizados
        </Text>
      </View>
    );
  }

  return <View />;
};

SyncNotice.propTypes = {
  isSynchronizing: PropTypes.bool.isRequired
};

export default SyncNotice;

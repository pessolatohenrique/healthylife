import React from 'react';
import { Spinner } from 'native-base';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CustomLoader = (props) => {
  const { isLoading } = props;
  return isLoading ? (
    <View style={styles.container}>
      <Spinner color="blue" />
    </View>
  ) : (
    <View />
  );
};

CustomLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default CustomLoader;

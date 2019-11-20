import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import commonStyle from '../utils/commonStyle';

const styles = StyleSheet.create({
  containerWidth: {
    width: '93%',
  },
  iconPadding: {
    paddingBottom: 20,
  },
});

const NotFound = () => (
  <View style={[commonStyle.containerCenter]}>
    <View style={styles.containerWidth}>
      <Icon
        name="flag"
        size={65}
        style={[commonStyle.textCenter, commonStyle.colorTheme, styles.iconPadding]}
      />
      <Text style={[commonStyle.textCenter, commonStyle.colorTheme]}>
        Verifique se digitou corretamente ou tente realizar a busca com outros termos
      </Text>
    </View>
  </View>
);

export default NotFound;

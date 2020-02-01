import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import commonStyle from "../../utils/commonStyle";
import PropTypes from "prop-types";

const Statistics = props => (
  <View style={[commonStyle.containerCenter, commonStyle.tabPadding]}>
    <Text>Quantidade consumida: {props.quantity}</Text>
    <Text>Calorias consumidas: {props.calories} kcal</Text>
  </View>
);

Statistics.propTypes = {
  quantity: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired
};

export default Statistics;

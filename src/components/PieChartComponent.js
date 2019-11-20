/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import { LEGEND_PIE_FONT_SIZE, LEGEND_PIE_COLOR, CHART_COLORS } from '../constants/general';

class PieChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMaped: [],
    };
  }

  componentDidMount() {
    this.mapChart();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.mapChart();
    }
  }

  mapChart = () => {
    const { data } = this.props;
    const dataMaped = [...data].map((item, index) => {
      const itemNew = {
        ...item,
        color: CHART_COLORS[index],
        legendFontColor: LEGEND_PIE_COLOR,
        legendFontSize: LEGEND_PIE_FONT_SIZE,
      };
      return itemNew;
    });

    this.setState({ dataMaped });
  };

  render() {
    const { isPorcentage } = this.props;
    const { dataMaped } = this.state;
    return (
      <PieChart
        data={dataMaped}
        width={Dimensions.get('window').width - 80} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute={!isPorcentage}
      />
    );
  }
}

PieChartComponent.defaultProps = {
  isPorcentage: false,
};

PieChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  isPorcentage: PropTypes.bool,
};

export default PieChartComponent;

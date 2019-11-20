/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';

class LineChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMaped: {
        labels: [],
        datasets: [{ data: [500] }],
      },
    };
  }

  componentDidMount() {
    this.mapChart();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data && data) {
      this.mapChart();
    }
  }

  mapChart = () => {
    const { data } = this.props;
    const labels = [...data].map(item => item.name);
    const values = [...data].map(item => item.value);

    const dataMaped = {
      labels,
      datasets: [
        {
          data: values,
        },
      ],
    };

    this.setState({ dataMaped });
  };

  render() {
    const { dataMaped } = this.state;
    return (
      <LineChart
        data={dataMaped}
        width={Dimensions.get('window').width - 50} // from react-native
        height={220}
        // yAxisLabel={'$'}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(30, 144, 240, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    );
  }
}

LineChartComponent.defaultProps = {
  data: [],
};

LineChartComponent.propTypes = {
  data: PropTypes.array,
};

export default LineChartComponent;

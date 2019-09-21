import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';

class BarChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMaped: {
        labels: [],
        datasets: [{ data: [] }],
      },
    };
  }

  componentDidMount() {
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
  }

  render() {
    const { dataMaped } = this.state;
    return (
      <BarChart
        style={{
          borderRadius: 16,
        }}
        data={dataMaped}
        backgroundColor="transparent"
        width={Dimensions.get('window').width - 70} // from react-native
        height={220}
        // yAxisLabel="$"
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
      />
    );
  }
}

BarChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BarChartComponent;

import React, { Component } from 'react';
import axios from 'axios';

import {
  Container, Content, Card, CardItem, Text, Body, View,
} from 'native-base';
import * as Progress from 'react-native-progress';

import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { bindActionCreators } from 'redux';
import PieChartComponent from '../../components/PieChartComponent';
import BarChartComponent from '../../components/BarChartComponent';
import commonStyle from '../../utils/commonStyle';

import { create } from '../../actions/product';
import LineChartComponent from '../../components/LineChartComponent';
import styles from './styles';

class DashboardContainer extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text style={commonStyle.colorTheme}>Consumo diário</Text>
            </CardItem>
            <CardItem bordered>
              <Body style={commonStyle.containerCenter}>
                <Progress.Circle 
                  size={140} 
                  progress={0.6} 
                  showsText  
                  formatText={(progress) => `60%`}
                  textStyle={{ fontSize: 28 }}
                  borderWidth={2}
                  />
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text style={commonStyle.colorTheme}>Você consumiu 1400 de 2800 calorias!</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text style={commonStyle.colorTheme}>Bar chart example</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <BarChartComponent
                  data={[
                    { name: 'January', value: 50 },
                    { name: 'February', value: 100 },
                    { name: 'March', value: 230 },
                    { name: 'April', value: 280 },
                    { name: 'May', value: 210 },
                  ]}
                />
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text style={commonStyle.colorTheme}>Line chart example</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <LineChartComponent
                  data={[
                    { name: 'January', value: 50 },
                    { name: 'February', value: 100 },
                    { name: 'March', value: 230 },
                    { name: 'April', value: 280 },
                    { name: 'May', value: 210 },
                  ]}
                />
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

DashboardContainer.propTypes = {
  // product: PropTypes.object.isRequired,
  // createProduct: PropTypes.func.isRequired,
};

export default DashboardContainer;

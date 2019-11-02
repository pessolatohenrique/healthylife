/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Container, Content, Card, CardItem, Text, Body,
} from 'native-base';
import * as Progress from 'react-native-progress';

import PieChartComponent from '../../components/PieChartComponent';
import commonStyle from '../../utils/commonStyle';

import LineChartComponent from '../../components/LineChartComponent';
import { getUserCalculate, insert, getLastResult } from './functions';
import { loadMealTypeFlow } from '../mealType/functions';
import { verifyShowError } from '../../utils/errors';
import { getRealm } from '../../config/realm';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indicators: {
        consumed_percentage: 0,
        diet_value: 0,
        consumed: 0,
        imc_classification: '#N/D',
      },
    };
  }

  loadIndicators = async () => {
    // verificar se está online
    const data = await getUserCalculate();
    const realm = await getRealm();

    if (verifyShowError(data)) return;

    const inserted = await insert(realm, data);

    if (verifyShowError(inserted)) return;

    this.setState({
      indicators: getLastResult(realm),
    });
  };

  /*
    realiza o carregamento de informações complementares ao sistema
    por exemplo: tipos de refeição
  */
  loadComplementars = async () => {
    await loadMealTypeFlow();
  };

  componentDidMount = async () => {
    await this.loadIndicators();
    await this.loadComplementars();
    // this.loadCharts();
  };

  render() {
    const { indicators } = this.state;
    const {
      consumed_percentage, diet_value, consumed, imc_classification,
    } = indicators;

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
                  progress={consumed_percentage / 100}
                  showsText
                  formatText={progress => `${consumed_percentage}%`}
                  textStyle={{ fontSize: 28 }}
                  borderWidth={2}
                />
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text style={commonStyle.colorTheme}>
                Você consumiu
                {' '}
                {consumed}
                {' '}
de
                {' '}
                {diet_value}
                {' '}
calorias!
              </Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text style={commonStyle.colorTheme}>Calorias por refeição</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <PieChartComponent
                  isPorcentage
                  data={[
                    { name: 'Café da manhã', value: 50 },
                    { name: 'Lanche da manhã', value: 100 },
                    { name: 'Almoço', value: 230 },
                    { name: 'Café da tarde', value: 280 },
                    { name: 'Jantar', value: 210 },
                  ]}
                />
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text style={commonStyle.colorTheme}>Histórico de peso</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <LineChartComponent
                  data={[
                    { name: '01/10', value: 50 },
                    { name: '08/10', value: 100 },
                    { name: '15/10', value: 230 },
                    { name: '22/10', value: 280 },
                    { name: '29/10', value: 210 },
                  ]}
                />
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text style={commonStyle.colorTheme}>
                Índice de massa corporal:
                {' '}
                {imc_classification}
              </Text>
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

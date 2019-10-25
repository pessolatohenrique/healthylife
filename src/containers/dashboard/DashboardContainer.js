import React, { Component } from 'react';
import {
  Container, Content, Card, CardItem, Text, Body,
} from 'native-base';
import * as Progress from 'react-native-progress';

import PieChartComponent from '../../components/PieChartComponent';
import commonStyle from '../../utils/commonStyle';

import LineChartComponent from '../../components/LineChartComponent';
import { getUserCalculate, insert } from './functions';
import { showToast } from '../../utils/errors';
import { getRealm } from '../../config/realm';

class DashboardContainer extends Component {
  componentDidMount = async () => {
    // verificar se está online
    const data = await getUserCalculate();
    const realm = await getRealm();

    if (data && data.error) {
      showToast(data.error);
    }

    const inserted = await insert(realm, data);

    if (inserted && inserted.error) {
      showToast(data.error);
    }
  };

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
                  // eslint-disable-next-line no-unused-vars
                  formatText={progress => '60%'}
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
              <Text style={commonStyle.colorTheme}>Índice de massa corporal: eutrofia</Text>
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

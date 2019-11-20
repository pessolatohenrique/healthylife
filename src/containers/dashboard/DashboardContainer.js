/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Container, Content, Card, CardItem, Text, Body,
} from 'native-base';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import PieChartComponent from '../../components/PieChartComponent';
import commonStyle from '../../utils/commonStyle';

import LineChartComponent from '../../components/LineChartComponent';
import { getUserCalculate, insert, getLastResult } from './functions';
import { loadMealTypeFlow } from '../mealType/functions';
import {
  getCalculateCalories,
  bulkInsert as insertMealReport,
  mapToChart as mapChartMeal,
  searchFromToday as searchMeals,
} from '../meal/functions';

import { verifyShowError } from '../../utils/errors';
import { getRealm } from '../../config/realm';
import { setList as setMealTypes } from '../../actions/mealType';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indicators: {
        consumed_percentage: 0,
        diet_value: 0,
        consumed: 0,
        imc_classification: '#N/D',
        meals_data: [],
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
    const { onSetMeals } = this.props;
    const meals = await loadMealTypeFlow();

    onSetMeals(meals);
  };

  loadMealReport = async () => {
    const { mealTypeList } = this.props;
    const data = await getCalculateCalories(mealTypeList);
    const realm = await getRealm();

    await insertMealReport(realm, data);

    const mealsData = await searchMeals(realm);
    this.setState({ meals_data: mapChartMeal(mealsData) });
  };

  componentDidMount = async () => {
    await this.loadIndicators();
    await this.loadComplementars();
    await this.loadMealReport();
  };

  render() {
    const { indicators, meals_data } = this.state;
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
                <PieChartComponent isPorcentage data={meals_data || []} />
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
                    { name: '01/10', value: 64 },
                    { name: '08/10', value: 67 },
                    { name: '15/10', value: 65 },
                    { name: '22/10', value: 65 },
                    { name: '29/10', value: 64 },
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
  onSetMeals: PropTypes.func.isRequired,
  mealTypeList: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  mealTypeList: state.mealType.list,
});

const mapDispatchToProps = dispatch => ({
  onSetMeals: data => dispatch(setMealTypes(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);

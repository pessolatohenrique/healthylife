/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
} from 'native-base';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
import {
  getHistory as getWeightHistory,
  bulkInsert as insertWeightHistory,
  searchFromMonth as searchWeightHistory,
  mapToChart as mapWeightHistory,
} from '../historyWeight/functions';

import { verifyShowError } from '../../utils/errors';
import { getRealm } from '../../config/realm';
import { setList as setMealTypes } from '../../actions/mealType';
import NotFound from '../../components/NotFound';
import OfflineNotice from '../../components/OfflineNotice';

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
        weight_history_data: [],
        message: '#N/D',
      },
    };
  }

  loadIndicators = async () => {
    const { connection } = this.props;
    const realm = await getRealm();

    if (connection.status) {
      const data = await getUserCalculate();

      if (verifyShowError(data)) return;

      const inserted = await insert(realm, data);

      if (verifyShowError(inserted)) return;
    }

    const indicators = getLastResult(realm);
    indicators.message = `Você consumiu ${indicators.consumed} de ${indicators.diet_value} calorias`;

    this.setState({
      indicators,
    });
  };

  /*
    realiza o carregamento de informações complementares ao sistema
    por exemplo: tipos de refeição
  */
  loadComplementars = async () => {
    const { onSetMeals, connection } = this.props;
    const meals = await loadMealTypeFlow(connection);

    onSetMeals(meals);
  };

  loadMealReport = async () => {
    const { connection } = this.props;
    const realm = await getRealm();

    if (connection.status) {
      const { mealTypeList } = this.props;
      const data = await getCalculateCalories(mealTypeList);

      await insertMealReport(realm, data);
    }

    const mealsData = await searchMeals(realm);
    this.setState({ meals_data: mapChartMeal(mealsData) });
  };

  loadWeightReport = async () => {
    const { connection } = this.props;
    const realm = await getRealm();

    if (connection.status) {
      const data = await getWeightHistory();
      await insertWeightHistory(realm, data);
    }

    const historyData = await searchWeightHistory(realm);

    this.setState({ weight_history_data: mapWeightHistory(historyData) });
  };

  loadFlow = async () => {
    await this.loadComplementars();
    await this.loadIndicators();
    await this.loadMealReport();
    await this.loadWeightReport();
  };

  componentDidMount = () => {
    const { connection } = this.props;
    if (!connection.status) {
      this.loadFlow();
    }
  };

  componentDidUpdate = (prevProps) => {
    const { connection } = this.props;
    if (prevProps.connection.status !== connection.status) {
      this.loadFlow();
    }
  };

  render() {
    const { indicators, meals_data, weight_history_data } = this.state;
    const { consumed_percentage, imc_classification, message } = indicators;

    return (
      <Container>
        <Content padder>
          <OfflineNotice />

          <View style={commonStyle.containerRowCenter}>
            <Button transparent iconLeft onPress={() => this.loadFlow()}>
              <Icon name="sync-alt" />
              <Text>Atualizar</Text>
            </Button>
          </View>

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
              <Text style={commonStyle.colorTheme}>{message}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text style={commonStyle.colorTheme}>Calorias por refeição</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                {meals_data && meals_data.length > 0 ? (
                  <PieChartComponent isPorcentage data={meals_data || []} />
                ) : (
                  <NotFound />
                )}
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text style={commonStyle.colorTheme}>Histórico de peso</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                {weight_history_data && weight_history_data.length > 0 ? (
                  <LineChartComponent data={weight_history_data} />
                ) : (
                  <NotFound />
                )}
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text style={commonStyle.colorTheme}>
                Índice de massa corporal:
                <Text> </Text>
                <Text style={commonStyle.colorTheme}>{imc_classification}</Text>
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
  connection: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  mealTypeList: state.mealType.list,
  connection: state.connection,
});

const mapDispatchToProps = dispatch => ({
  onSetMeals: data => dispatch(setMealTypes(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

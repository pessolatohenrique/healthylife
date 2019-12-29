import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Picker,
} from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import LineChartComponent from '../../components/LineChartComponent';
import OfflineNotice from '../../components/OfflineNotice';
import NotFound from '../../components/NotFound';
import { getRealm } from '../../config/realm';
import commonStyle from '../../utils/commonStyle';
import WeightList from './WeightList';
import ImcList from './ImcList';
import FabOptions from './FabOptions';
import SearchModal from './SearchModal';
import RegisterModal from './RegisterModal';

import {
  getHistory as getWeightHistory,
  bulkInsert as insertWeightHistory,
  bulkInsertFromSearch as insertWeightSearch,
  search as searchWeightHistory,
  searchFromMonth,
  getHistorySearch,
  mapToChart as mapWeightHistory,
} from './functions';

class HistoryWeightContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'chart',
      visibleModal: false,
      visibleRegisterModal: false,
      chartData: [],
      historyData: [],
    };
  }

  loadInitialReport = async () => {
    const { connection } = this.props;
    const realm = await getRealm();

    if (connection.status) {
      const data = await getWeightHistory();
      await insertWeightHistory(realm, data);
    }

    const historyData = await searchFromMonth(realm);

    this.setState({ historyData, chartData: mapWeightHistory(historyData) });
  };

  searchReportFlow = async (date_initial, date_final) => {
    const { connection } = this.props;
    const realm = await getRealm();
    const dateInitialFormatted = moment(date_initial, 'DD/MM/YYYY').format(
      'YYYY-MM-DD',
    );

    const dateFinalFormatted = moment(date_final, 'DD/MM/YYYY').format(
      'YYYY-MM-DD',
    );

    if (connection.status) {
      const data = await getHistorySearch(
        dateInitialFormatted,
        dateFinalFormatted,
      );
      await insertWeightSearch(realm, data);
    }

    const objectSearch = {
      date_initial: dateInitialFormatted,
      date_final: dateFinalFormatted,
    };
    const historyData = await searchWeightHistory(realm, objectSearch);

    this.setState({ historyData, chartData: mapWeightHistory(historyData) });
  };

  componentDidMount = () => {
    this.loadInitialReport();
  };

  toggleModal = (status) => {
    this.setState({ visibleModal: status });
  };

  toggleRegisterModal = (status) => {
    this.setState({ visibleRegisterModal: status });
  };

  render() {
    const { selected, visibleModal, visibleRegisterModal } = this.state;
    const { historyData, chartData } = this.state;

    return (
      <Container>
        <Content padder>
          <OfflineNotice />
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text style={commonStyle.colorTheme}>Navegue</Text>
                  <Text note>
                    Acompanhe aqui o seu histórico de peso e índice de massa
                    corporal (IMC).
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Picker
                mode="dropdown"
                note={false}
                selectedValue={selected}
                onValueChange={value => this.setState({ selected: value })}
              >
                <Picker.Item label="Visualização em gráfico" value="chart" />
                <Picker.Item label="Visualização em peso" value="weight" />
                <Picker.Item label="Visualização em IMC" value="imc" />
              </Picker>
            </CardItem>
            {selected === 'chart' && (
              <CardItem>
                {chartData && chartData.length > 0 ? (
                  <LineChartComponent data={chartData} />
                ) : (
                  <NotFound />
                )}
              </CardItem>
            )}

            {/** passar o history data aqui. Depois converter para FlatList */}
            {selected === 'weight' && (
              <CardItem>
                {chartData && chartData.length > 0 ? (
                  <WeightList data={historyData} />
                ) : (
                  <NotFound />
                )}
              </CardItem>
            )}

            {selected === 'imc' && (
              <CardItem>
                {chartData && chartData.length > 0 ? (
                  <ImcList data={historyData} />
                ) : (
                  <NotFound />
                )}
              </CardItem>
            )}
          </Card>
        </Content>
        <SearchModal
          visible={visibleModal}
          onClose={() => this.toggleModal(false)}
          onSearch={this.searchReportFlow}
        />

        <RegisterModal
          visible={visibleRegisterModal}
          onClose={() => this.toggleRegisterModal(false)}
        />

        <FabOptions
          onSearch={this.toggleModal}
          onShowRegister={this.toggleRegisterModal}
        />
      </Container>
    );
  }
}

HistoryWeightContainer.propTypes = {
  connection: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  connection: state.connection,
});

export default connect(mapStateToProps, null)(HistoryWeightContainer);

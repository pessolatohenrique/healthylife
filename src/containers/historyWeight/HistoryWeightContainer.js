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
import LineChartComponent from '../../components/LineChartComponent';
import commonStyle from '../../utils/commonStyle';
import WeightList from './WeightList';
import ImcList from './ImcList';
import FabOptions from './FabOptions';
import SearchModal from './SearchModal';

class HistoryWeightContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'chart',
      visibleModal: false,
    };
  }

  toggleModal = (status) => {
    this.setState({ visibleModal: status });
  };

  render() {
    const { selected, visibleModal } = this.state;

    return (
      <Container>
        <Content padder>
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
                <LineChartComponent
                  data={[
                    { name: '26/05', value: 190 },
                    { name: '26/06', value: 220 },
                  ]}
                />
              </CardItem>
            )}

            {selected === 'weight' && (
              <CardItem>
                <WeightList />
              </CardItem>
            )}

            {selected === 'imc' && (
              <CardItem>
                <ImcList />
              </CardItem>
            )}
          </Card>
        </Content>
        <SearchModal
          visible={visibleModal}
          onClose={() => this.toggleModal(false)}
        />
        <FabOptions onSearch={this.toggleModal} />
      </Container>
    );
  }
}

export default HistoryWeightContainer;

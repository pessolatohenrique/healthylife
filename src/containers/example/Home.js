import React, { Component } from 'react';
import axios from 'axios';

import {
  Container, Content, Card, CardItem, Text, Body, View,
} from 'native-base';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { bindActionCreators } from 'redux';
import PieChartComponent from '../../components/PieChartComponent';
import BarChartComponent from '../../components/BarChartComponent';
import commonStyle from '../../utils/commonStyle';
import { configureAxios } from '../../config/axios';

import { create } from '../../actions/product';
import LineChartComponent from '../../components/LineChartComponent';
import styles from './styles';

class Home extends Component {
  componentDidMount() {
    const { product, createProduct } = this.props;
    const { list } = product;
    createProduct({ id: Math.floor(Math.random() * 1000), name: 'Course of PHP 7.1' }, list);

    // configureAxios();

    axios
      .get('/products')
      .then(response => console.tron.log('Response', response))
      .catch(error => console.tron.log('Error', error));
  }

  render() {
    const { product } = this.props;
    const { addedProduct } = product;

    console.tron.log('Produto adicionado: ', addedProduct);
    console.tron.log('Lista de produtos', product.list);

    return (
      <Container>
        <Content padder>
          <View style={[commonStyle.containerRow, commonStyle.priorirty]}>
            <View style={styles.indicatorView}>
              <Card>
                <CardItem>
                  <Text style={styles.indicatorText}>100</Text>
                  <Text note style={styles.indicatorSubtitle}>
                    sales
                  </Text>
                </CardItem>
              </Card>
            </View>

            <View style={styles.indicatorView}>
              <Card>
                <CardItem>
                  <Text style={styles.indicatorText}>50</Text>
                  <Text note style={styles.indicatorSubtitle}>
                    products
                  </Text>
                </CardItem>
              </Card>
            </View>
          </View>

          <Card>
            <CardItem>
              <Text style={styles.indicatorText}>Good job!</Text>
              <Text note style={styles.indicatorSubtitle}>
                The final result was $ 4091,90
              </Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text style={commonStyle.colorTheme}>Pie chart example</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <PieChartComponent
                  isPorcentage
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

Home.propTypes = {
  product: PropTypes.object.isRequired,
  createProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  product: state.product,
});

const mapDispatchToProps = dispatch => bindActionCreators({ createProduct: create }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

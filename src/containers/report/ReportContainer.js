import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import commonStyle from "../../utils/commonStyle";

class ReportContainer extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text style={commonStyle.colorTheme}>Navegue</Text>
                  <Text note>
                    Acompanhe aqui o seu progresso para uma vida saudável!
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={require("../../../assets/imgs/reports.png")}
                style={[commonStyle.imageSection]}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Text>Calorias por refeição</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent>
                  <Icon name="arrow-forward" />
                </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Button
                  transparent
                  onPress={() => navigation.navigate("HistoryWeight")}
                >
                  <Text>Peso e IMC</Text>
                </Button>
              </Left>
              <Right>
                <Button
                  transparent
                  onPress={() => navigation.navigate("HistoryWeight")}
                >
                  <Icon name="arrow-forward" />
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default ReportContainer;

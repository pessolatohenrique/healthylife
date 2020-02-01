import React, { Component } from "react";
import { FlatList } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Tab,
  Tabs,
  List,
  ListItem
} from "native-base";
import commonStyle from "../../utils/commonStyle";
import SyncNotice from "../../components/SyncNotice";
import Statistics from "./Statistics";
import MealItem from "./MealItem";
import FabOptions from "./FabOptions";

class MealContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          quantity: 1,
          calories_total: 200,
          food: {
            description: "Alfajor de chocolate",
            measure: "1 unidade (50g)",
            group: {
              description: "Açúcares"
            }
          }
        }
      ]
    };
  }
  render() {
    const { navigation } = this.props;
    const { data } = this.state;

    return (
      <Container>
        <Content>
          <Tabs tabBarUnderlineStyle={commonStyle.tabBottomActive}>
            <Tab
              heading="Café da manhã"
              tabStyle={commonStyle.tab}
              textStyle={commonStyle.tabText}
              activeTabStyle={commonStyle.tab}
              activeTextStyle={commonStyle.tabText}
            >
              <SyncNotice isSynchronizing />

              <Statistics quantity={2} calories={200} />

              <FlatList
                data={data}
                renderItem={({ item }) => <MealItem item={item} />}
                keyExtractor={item => item.id.toString()}
              />
            </Tab>
            <Tab
              heading="Lanche da manhã"
              tabStyle={commonStyle.tab}
              textStyle={commonStyle.tabText}
              activeTabStyle={commonStyle.tab}
              activeTextStyle={commonStyle.tabText}
            >
              <Text>Lanche da Manhã</Text>
            </Tab>
            <Tab
              heading="Almoço"
              tabStyle={commonStyle.tab}
              textStyle={commonStyle.tabText}
              activeTabStyle={commonStyle.tab}
              activeTextStyle={commonStyle.tabText}
            >
              <Text>Aba 03</Text>
            </Tab>
            <Tab
              heading="Lanche da tarde"
              tabStyle={commonStyle.tab}
              textStyle={commonStyle.tabText}
              activeTabStyle={commonStyle.tab}
              activeTextStyle={commonStyle.tabText}
            >
              <Text>Aba 03</Text>
            </Tab>
            <Tab
              heading="Jantar"
              tabStyle={commonStyle.tab}
              textStyle={commonStyle.tabText}
              activeTabStyle={commonStyle.tab}
              activeTextStyle={commonStyle.tabText}
            >
              <Text>Aba 03</Text>
            </Tab>
          </Tabs>
        </Content>
        <FabOptions onSearch={() => true} onShowRegister={() => true} />
      </Container>
    );
  }
}

export default MealContainer;

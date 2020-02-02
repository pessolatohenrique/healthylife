import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Text, Tab, Tabs } from "native-base";
import { connect } from "react-redux";
import { getRealm } from "../../config/realm";
import commonStyle from "../../utils/commonStyle";
import SyncNotice from "../../components/SyncNotice";
import Statistics from "./Statistics";
import MealItem from "./MealItem";
import FabOptions from "./FabOptions";
import { loadFoodGroupFlow as syncFoodGroup } from "../foodGroup/functions";
import { setList as setFoodGroups } from "../../actions/foodGroup";

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

  componentDidMount = async () => {
    const realm = await getRealm();
    const { connection, onSetFoodGroups } = this.props;

    const foodGroups = await syncFoodGroup(connection);
    await onSetFoodGroups(foodGroups);

    console.tron.log(
      "from database",
      await realm.objects("FoodGroup").sorted("id")
    );
  };

  render() {
    const { navigation, foodGroups } = this.props;
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

const mapStateToProps = state => ({
  connection: state.connection,
  foodGroups: state.foodGroup
});

const mapDispatchToProps = dispatch => ({
  onSetFoodGroups: items => dispatch(setFoodGroups(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(MealContainer);

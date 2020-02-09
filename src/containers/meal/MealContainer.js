import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Text, Tab, Tabs } from "native-base";
import { connect } from "react-redux";
import { getRealm } from "../../config/realm";
import commonStyle from "../../utils/commonStyle";
import OfflineNotice from "../../components/OfflineNotice";
import SyncNotice from "../../components/SyncNotice";
import Statistics from "./Statistics";
import MealItem from "./MealItem";
import FabOptions from "./FabOptions";
import MealTab from "./MealTab";
import { loadFoodGroupFlow as syncFoodGroup } from "../foodGroup/functions";
import { loadFoodFlow as syncFood } from "../food/functions";
import {
  loadMealFlow as syncMeal,
  groupByMealType as groupMeals
} from "../mealfulfilled/functions";
import { setList as setFoodGroups } from "../../actions/foodGroup";

class MealContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSynchronizing: false,
      data: []
    };
  }

  componentDidMount = async () => {
    const realm = await getRealm();
    const { connection, onSetFoodGroups } = this.props;

    this.setState({ isSynchronizing: true });

    const foodGroups = await syncFoodGroup(connection);
    await onSetFoodGroups(foodGroups);
    await syncFood(connection, foodGroups);

    const meals = await syncMeal(connection, foodGroups);
    const mealsGrouped = await groupMeals(meals);
    this.setState({ data: mealsGrouped });

    this.setState({ isSynchronizing: false });
  };

  render() {
    const { navigation, foodGroups } = this.props;
    const { data, isSynchronizing } = this.state;

    return (
      <Container>
        <Content>
          {data && data.length > 0 && (
            <Tabs tabBarUnderlineStyle={commonStyle.tabBottomActive}>
              {data && data[0] && (
                <Tab
                  heading={data[0].items[0].meal_type.description}
                  tabStyle={commonStyle.tab}
                  textStyle={commonStyle.tabText}
                  activeTabStyle={commonStyle.tab}
                  activeTextStyle={commonStyle.tabText}
                >
                  <OfflineNotice />
                  <SyncNotice isSynchronizing={isSynchronizing} />

                  <Statistics
                    quantity={data[0].totals.quantity}
                    calories={data[0].totals.calories}
                  />

                  <FlatList
                    data={data[0].items}
                    renderItem={({ item }) => <MealItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                  />
                </Tab>
              )}

              {data && data[1] && (
                <Tab
                  heading={data[1].items[0].meal_type.description}
                  tabStyle={commonStyle.tab}
                  textStyle={commonStyle.tabText}
                  activeTabStyle={commonStyle.tab}
                  activeTextStyle={commonStyle.tabText}
                >
                  <OfflineNotice />
                  <SyncNotice isSynchronizing={isSynchronizing} />

                  <Statistics
                    quantity={data[1].totals.quantity}
                    calories={data[1].totals.calories}
                  />

                  <FlatList
                    data={data[1].items}
                    renderItem={({ item }) => <MealItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                  />
                </Tab>
              )}

              {data && data[2] && (
                <Tab
                  heading={data[2].items[0].meal_type.description}
                  tabStyle={commonStyle.tab}
                  textStyle={commonStyle.tabText}
                  activeTabStyle={commonStyle.tab}
                  activeTextStyle={commonStyle.tabText}
                >
                  <OfflineNotice />
                  <SyncNotice isSynchronizing={isSynchronizing} />

                  <Statistics
                    quantity={data[2].totals.quantity}
                    calories={data[2].totals.calories}
                  />

                  <FlatList
                    data={data[2].items}
                    renderItem={({ item }) => <MealItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                  />
                </Tab>
              )}

              {data && data[3] && (
                <Tab
                  heading={data[3].items[0].meal_type.description}
                  tabStyle={commonStyle.tab}
                  textStyle={commonStyle.tabText}
                  activeTabStyle={commonStyle.tab}
                  activeTextStyle={commonStyle.tabText}
                >
                  <OfflineNotice />
                  <SyncNotice isSynchronizing={isSynchronizing} />

                  <Statistics
                    quantity={data[3].totals.quantity}
                    calories={data[3].totals.calories}
                  />

                  <FlatList
                    data={data[3].items}
                    renderItem={({ item }) => <MealItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                  />
                </Tab>
              )}

              {data && data[4] && (
                <Tab
                  heading={data[4].items[0].meal_type.description}
                  tabStyle={commonStyle.tab}
                  textStyle={commonStyle.tabText}
                  activeTabStyle={commonStyle.tab}
                  activeTextStyle={commonStyle.tabText}
                >
                  <OfflineNotice />
                  <SyncNotice isSynchronizing={isSynchronizing} />

                  <Statistics
                    quantity={data[4].totals.quantity}
                    calories={data[4].totals.calories}
                  />

                  <FlatList
                    data={data[4].items}
                    renderItem={({ item }) => <MealItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                  />
                </Tab>
              )}
            </Tabs>
          )}
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

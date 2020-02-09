import React from "react";
import { FlatList } from "react-native";
import { Container, Content, Text, Tab, Tabs } from "native-base";
import { connect } from "react-redux";
import { getRealm } from "../../config/realm";
import commonStyle from "../../utils/commonStyle";

const MealTab = props => {
  console.tron.log("props", props);
  return (
    <Tab
      heading={item.items[0].meal_type.description}
      tabStyle={commonStyle.tab}
      textStyle={commonStyle.tabText}
      activeTabStyle={commonStyle.tab}
      activeTextStyle={commonStyle.tabText}
    >
      <Text>TEXTO</Text>
    </Tab>
  );
};

export default MealTab;

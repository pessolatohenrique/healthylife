import React from "react";
import { ListItem, Text } from "native-base";

const MealItem = props => (
  <>
    <ListItem itemDivider>
      <Text>{props.item.food.description}</Text>
    </ListItem>
    <ListItem>
      <Text>{props.item.food.group.description}</Text>
    </ListItem>
    <ListItem>
      <Text>Quantidade: {props.item.quantity}</Text>
    </ListItem>
    <ListItem>
      <Text>Medida caseira: {props.item.food.measure}</Text>
    </ListItem>
    <ListItem>
      <Text>{props.item.calories_total} kcal</Text>
    </ListItem>
  </>
);

export default MealItem;

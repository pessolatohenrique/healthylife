import React from "react";
import { ListItem, Text, Left, Right } from "native-base";

const MealItem = props => (
  <>
    <ListItem itemDivider>
      <Left>
        <Text>{props.item.food.description}</Text>
      </Left>
      <Right>
        <Text>{props.item.calories_total} kcal</Text>
      </Right>
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
  </>
);

export default MealItem;

import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Right,
  Left,
  Badge,
} from 'native-base';

const WeightList = props => (
  <Container>
    <Content>
      <List>
        <ListItem avatar>
          <Body>
            <Text>10/12/2019</Text>
            <Text note>63 KG</Text>
          </Body>
          <Right>
            <Badge success>
              <Text>0,50</Text>
            </Badge>
            {/* <Text note>3:43 pm</Text> */}
          </Right>
        </ListItem>
        <ListItem avatar>
          <Left>{/* <Thumbnail source={{ uri: 'Image URL' }} /> */}</Left>
          <Body>
            <Text>10/12/2019</Text>
            <Text note>63 KG</Text>
          </Body>
          <Right>
            <Badge success>
              <Text>0,50</Text>
            </Badge>
            {/* <Text note>3:43 pm</Text> */}
          </Right>
        </ListItem>
        <ListItem avatar>
          <Left>{/* <Thumbnail source={{ uri: 'Image URL' }} /> */}</Left>
          <Body>
            <Text>10/12/2019</Text>
            <Text note>63 KG</Text>
          </Body>
          <Right>
            <Badge danger>
              <Text>0,30</Text>
            </Badge>
            {/* <Text note>3:43 pm</Text> */}
          </Right>
        </ListItem>
      </List>
    </Content>
  </Container>
);

export default WeightList;

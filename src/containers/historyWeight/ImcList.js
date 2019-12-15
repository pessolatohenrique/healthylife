import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Right,
  Badge,
} from 'native-base';

const ImcList = props => (
  <Container>
    <Content>
      <List>
        <ListItem avatar>
          <Body>
            <Text>10/12/2019</Text>
            <Text note>22,32 - Eutrofia</Text>
          </Body>
          <Right>
            <Badge success>
              <Text>0,50</Text>
            </Badge>
            {/* <Text note>3:43 pm</Text> */}
          </Right>
        </ListItem>
      </List>
    </Content>
  </Container>
);

export default ImcList;

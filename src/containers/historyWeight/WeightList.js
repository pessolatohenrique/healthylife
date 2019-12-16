import React from 'react';
import { FlatList } from 'react-native';
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
import PropTypes from 'prop-types';
import moment from 'moment';

const WeightItem = ({ item }) => (
  <ListItem avatar>
    <Body>
      <Text>{moment(item.registered_at).format('DD/MM/YYYY')}</Text>
      <Text note>
        <Text note>{item.weight}</Text>
        <Text note>kg</Text>
      </Text>
    </Body>
    <Right>
      {item.difference_weight >= 0 ? (
        <Badge success>
          <Text>{item.difference_weight}</Text>
        </Badge>
      ) : (
        <Badge danger>
          <Text>{item.difference_weight}</Text>
        </Badge>
      )}
    </Right>
  </ListItem>
);

const WeightList = (props) => {
  const { data } = props;
  return (
    <Container>
      <Content>
        <List>
          <FlatList
            data={data}
            renderItem={({ item }) => <WeightItem item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </List>
      </Content>
    </Container>
  );
};

WeightList.propTypes = {
  data: PropTypes.object.isRequired,
};

WeightItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default WeightList;

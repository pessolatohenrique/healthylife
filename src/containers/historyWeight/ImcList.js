import React from "react";
import { FlatList } from "react-native";
import moment from "moment";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Right,
  Badge
} from "native-base";
import PropTypes from "prop-types";

const ImcItem = ({ item }) => (
  <ListItem avatar>
    <Body>
      <Text>{moment(item.registered_at).format("DD/MM/YYYY")}</Text>
      <Text note>
        <Text note>{item.classification_imc}</Text>
      </Text>
    </Body>
    <Right>
      {item.difference_imc >= 0 ? (
        <Badge success>
          <Text>{item.difference_imc}</Text>
        </Badge>
      ) : (
        <Badge danger>
          <Text>{item.difference_imc.toString().replace("-", "")}</Text>
        </Badge>
      )}
    </Right>
  </ListItem>
);

const ImcList = props => {
  const { data } = props;
  return (
    <Container>
      <Content>
        <List>
          <FlatList
            data={data}
            renderItem={({ item }) => <ImcItem item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </List>
      </Content>
    </Container>
  );
};

ImcList.propTypes = {
  data: PropTypes.object.isRequired
};

ImcItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default ImcList;

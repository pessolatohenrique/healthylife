import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Toast,
} from 'native-base';
import PropTypes from 'prop-types';
import FabExample from './FabExample';
import { getRealm } from '../../config/realm';
import { createLanguages, addNewLanguage, search as searchItens } from './Functions';
import NotFound from '../../components/NotFound';

class ListExample extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    const realm = await getRealm();
    await createLanguages(realm);
    this.setState({ data: realm.objects('Language').sorted('name') });
  }

  async componentDidUpdate(prevProps) {
    const { navigation } = this.props;
    if (prevProps.navigation !== navigation) {
      const searchText = navigation.getParam('search');
      this.search(searchText);
    }
  }

  search = async (text) => {
    const realm = await getRealm();
    const filteredItems = searchItens(realm, text);

    this.setState({ data: filteredItems.sorted('name') });
  };

  create = async () => {
    const realm = await getRealm();
    await addNewLanguage(realm);
    this.setState({ data: realm.objects('Language').sorted('name') });
  };

  delete = async () => {
    const realm = await getRealm();

    realm.write(() => {
      const allLanguages = realm.objects('Language');
      realm.delete(allLanguages);
    });

    this.setState({ data: realm.objects('Language').sorted('name') });
  };

  renderLanguage = ({ item }) => (
    <ListItem avatar>
      <Left>
        <Thumbnail
          source={{
            uri: item.image,
          }}
          small
        />
      </Left>
      <Body>
        <Text>{item.name}</Text>
        <Text note>{item.description}</Text>
      </Body>
      <Right>
        <Text note>{item.category.name}</Text>
      </Right>
    </ListItem>
  );

  render() {
    const { data } = this.state;

    if (data && data.length === 0) {
      return <NotFound />;
    }

    return (
      <Container>
        <Content>
          <List>
            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={this.renderLanguage}
              onRefresh={() => {
                Toast.show({
                  text: 'Atualizado com sucesso!',
                  buttonText: 'Okay',
                  duration: 3000,
                  type: 'success',
                });
              }}
              refreshing={false}
            />
          </List>
        </Content>
        <FabExample onAdd={this.create} onDelete={this.delete} />
      </Container>
    );
  }
}

ListExample.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ListExample;

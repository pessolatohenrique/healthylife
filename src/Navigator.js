/* eslint-disable react/prop-types */
import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import commonStyle from './utils/commonStyle';
import Home from './containers/dashboard/DashboardContainer';
import Register from './containers/form/Register';
import ListExample from './containers/exampleRealm/ListExample';
import CustomHeaderSearch from './components/CustomHeaderSearch';
import AuthLoading from './containers/auth/AuthLoading';
import SignIn from './containers/auth/SignIn';
import ReportContainer from './containers/report/ReportContainer';

/**
 * cada página pode ter subpáginas.
 * por exemplo: um produto pode ter uma listagem, formulário, edição, etc
 * por este motivo, a divisão com stackNavigator e bottomTabs
 */
const HomeStack = createStackNavigator({
  Home: {
    screen: () => <Home title="Dashboard card" />,
    navigationOptions: ({ navigation }) => ({
      title: 'Dashboard',
      headerRight: (
        <Button
          transparent
          onPress={() => {
            Alert.alert(
              'Confirmation message',
              'Do you want to logout?',
              [
                {
                  text: 'No',
                  onPress: () => true,
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: async () => {
                    await AsyncStorage.removeItem('token');
                    navigation.navigate('Auth');
                  },
                },
              ],
              { cancelable: false },
            );
          }}
          style={{ paddingRight: 10, paddingTop: 15 }}
        >
          <Icon name="sign-out-alt" size={20} color="white" />
        </Button>
        // <Button onPress={() => navigation.navigate('Auth')} title="+1" color="#fff" />)
      ),
      headerTintColor: '#fff',
      headerStyle: commonStyle.header,
    }),
  },
  // Details: DetailsScreen,
});

const RegisterStack = createStackNavigator({
  Home: {
    screen: () => <Register />,
    navigationOptions: {
      title: 'Register',
      headerTintColor: '#fff',
      headerStyle: commonStyle.header,
    },
  },
  // Details: DetailsScreen,
});

const ReportStack = createStackNavigator({
  Home: {
    screen: ({ navigation }) => <ReportContainer navigation={navigation} />,
    navigationOptions: ({ navigation }) => ({
      title: 'Relatórios',
      headerTintColor: '#fff',
      headerStyle: commonStyle.header,
    }),
  },
  // Details: DetailsScreen,
});

const AuthNavigator = createStackNavigator({
  SignIn: {
    screen: ({ navigation }) => <SignIn navigation={navigation} />,
    navigationOptions: () => ({
      title: 'SignIn',
      header: null,
      headerTintColor: '#fff',
      headerStyle: commonStyle.header,
    }),
  },
});

const MenuRoutes = {
  Dashboard: {
    name: 'Dashboard',
    screen: HomeStack,
    navigationOptions: {
      title: 'Dashboard',
      header: { visible: true },
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color={tintColor} />
      ),
    },
  },
  Add: {
    name: 'Meals',
    screen: RegisterStack,
    navigationOptions: {
      title: 'Refeições',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="utensils" size={30} color={tintColor} />
      ),
    },
  },
  List: {
    name: 'Reports',
    screen: ReportStack,
    navigationOptions: {
      title: 'Relatórios',
      // headerTitle: <CustomHeaderSearch />,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="chart-line" size={30} color={tintColor} />
      ),
    },
  },
};

const MenuConfig = {
  initialRouteName: 'Dashboard',
  tabBarOptions: {
    showLabel: true,
  },
};

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig);

const loginOrMain = createSwitchNavigator(
  {
    AuthLoading,
    App: MenuNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default loginOrMain;

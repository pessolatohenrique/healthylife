import { StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../constants/general';

export default StyleSheet.create({
  error: {
    paddingLeft: 10,
    paddingTop: 5,
    color: 'red',
  },
  priorirty: {
    flex: 1,
  },
  header: {
    backgroundColor: MAIN_COLOR,
  },
  headerCustomPadding: {
    paddingLeft: 20,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  searchPadding: {
    paddingLeft: 10,
  },
  containerCenter: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRowCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
  colorTheme: {
    color: MAIN_COLOR,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  regularInput: { backgroundColor: '#ffffff', marginBottom: 10 },
  containerMargin: { marginLeft: 10, marginRight: 10 },
  imageSection: {
    height: 200,
    width: null,
    flex: 1,
    resizeMode: 'contain',
  },
});

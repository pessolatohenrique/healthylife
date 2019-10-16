import { StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../constants/general';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  indicatorView: {
    width: '48%',
  },
  indicatorText: {
    paddingRight: 10,
    fontSize: 30,
    color: MAIN_COLOR,
  },
  indicatorSubtitle: { fontSize: 16 },
});

export default styles;

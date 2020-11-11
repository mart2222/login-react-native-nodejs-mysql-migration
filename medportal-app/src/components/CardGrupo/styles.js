import {StyleSheet} from 'react-native';
import {metrics} from './../../styles';

const {responsive} = metrics;
export default StyleSheet.create({
  card: {
    borderBottomWidth: responsive(1),
  },
  textoDescricao: {
    fontSize: responsive(18),
    fontWeight: '700',
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsive(30),
  },
  containerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoParticipando: {
    fontSize: responsive(14),
    fontWeight: '400',
  },
});

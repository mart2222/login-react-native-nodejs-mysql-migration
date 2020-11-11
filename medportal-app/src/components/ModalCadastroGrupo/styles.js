import {StyleSheet} from 'react-native';
import {metrics, colors} from './../../styles';

const {responsive} = metrics;
export default StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: colors.bgModal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModalConfig: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsive(10),
    backgroundColor: colors.cardModal,
    borderWidth: responsive(2),
    borderColor: colors.borderModal,
  },
  botaoModalOk: {
    borderColor: colors.borderBotaoModal,
    borderWidth: responsive(2),
    borderRadius: responsive(3),
    padding: responsive(10),
    margin: responsive(10),
    marginTop: responsive(30),
    paddingHorizontal: responsive(40),
    alignItems: 'center',
  },
  textoBotaoModalOk: {
    color: colors.textoPreto,
    fontSize: responsive(18),
  },
  texto: {
    fontSize: responsive(20),
    color: colors.textoPreto,
  },
  textoLabel: {
    fontSize: responsive(16),
    marginLeft: responsive(3),
    color: colors.textoPreto,
  },
  contentBotao: {
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  contentNovoGrupo: {
    paddingVertical: responsive(5),
  },
  inputNovoGrupo: {
    backgroundColor: colors.bgInput,
    borderRadius: responsive(5),
    borderWidth: responsive(1),
    borderColor: colors.borderInput,
    height: responsive(44),
    width: responsive(250),
    fontSize: responsive(16),
    color: colors.textoPreto,
  },
  textoErro: {
    textAlign: 'center',
    color: colors.warning,
    fontSize: responsive(16),
  },
});

import {StyleSheet} from 'react-native';
import {metrics, colors} from './../../styles';

const {responsive} = metrics;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  textoBemVindo: {
    textAlign: 'center',
    fontSize: responsive(50),
    fontWeight: '700',
    color: colors.textoBranco,
    textShadowColor: colors.textShadowColor,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 20,
  },
  textoLogin: {
    textAlign: 'center',
    fontSize: responsive(22),
    fontWeight: '700',
    color: colors.textoBranco,
    textShadowColor: colors.textShadowColor,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 12,
    marginBottom: responsive(10),
  },
  inputTexto: {
    textAlign: 'center',
    backgroundColor: colors.bgInput,
    borderRadius: responsive(5),
    borderWidth: responsive(1),
    borderColor: colors.borderInput,
    height: responsive(50),
    fontSize: responsive(18),
    paddingHorizontal: responsive(10),
    marginHorizontal: responsive(20),
    color: colors.textoPreto,
  },
  inputSenha: {
    marginTop: responsive(10),
  },
  textoLoading: {
    fontSize: responsive(16),
    fontWeight: '300',
    color: colors.textoBranco,
    textAlign: 'center',
  },
  botao: {
    borderColor: colors.borderBotao,
    borderWidth: responsive(2),
    borderRadius: responsive(3),
    padding: responsive(10),
    marginHorizontal: responsive(20),
    marginVertical: responsive(40),
    alignItems: 'center',
  },
  textoCriarConta: {
    fontSize: responsive(18),
    fontWeight: '400',
    color: colors.textoBranco,
    textAlign: 'center',
    textShadowColor: colors.textShadowColor,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  textoEntrar: {
    fontSize: responsive(18),
    color: colors.textoBranco,
  },
  botaoDisabled: {
    opacity: 0.5,
  },
  textoErro: {
    textAlign: 'center',
    color: colors.warning,
    fontSize: responsive(16),
  },
  containerSaveLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoSalvarLogin: {
    fontSize: responsive(18),
    color: colors.textoBranco,
    textShadowColor: colors.textShadowColor,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 12,
  },
});

import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Alert, Text, TouchableHighlight, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch} from 'react-redux';
import {GrupoTypes} from '../../store/ducks/grupo';
import {LoginTypes} from '../../store/ducks/login';
import {colors, metrics} from './../../styles';
import styles from './styles';

const {responsive} = metrics;

const CardGrupo = ({grupo, isSelected}) => {
  const dispatch = useDispatch();

  const vinculo = (grupoId) => {
    const title = isSelected ? 'Desvincular' : 'Vincular';
    const msg = isSelected ? 'desvincular' : 'vincular';

    Alert.alert(
      title,
      `Deseja realmente ${msg}?`,
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            if (isSelected) {
              desvincular(grupoId);
              return;
            }
            vincular(grupoId);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const vincular = (grupoId) => {
    dispatch({
      type: LoginTypes.VINCULAR,
      grupoId,
    });
  };

  const desvincular = (grupoId) => {
    dispatch({
      type: LoginTypes.DESVINCULAR,
      grupoId,
    });
  };

  const deletarGrupo = (grupoId) => {
    Alert.alert(
      'Deletar',
      'Deseja realmente deletar o grupo selecionado?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            dispatch({
              type: GrupoTypes.DELETAR,
              grupoId,
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Item
      grupo={grupo}
      vinculo={vinculo}
      deletarGrupo={deletarGrupo}
      isSelected={isSelected}
    />
  );
};

CardGrupo.propTypes = {
  grupo: PropTypes.objectOf(PropTypes.any).isRequired,
  isSelected: PropTypes.bool,
};

CardGrupo.defaultProps = {
  isSelected: false,
};

export default memo(CardGrupo);

class Item extends React.PureComponent {
  render() {
    const {grupo, vinculo, deletarGrupo, isSelected} = this.props;
    return (
      <TouchableHighlight
        style={styles.card}
        underlayColor={colors.borderItemList}
        onPress={() => vinculo(grupo.id)}
        onLongPress={() => deletarGrupo(grupo.id)}
        delayLongPress={500}>
        <View style={styles.container}>
          <Text style={styles.textoDescricao}>{grupo.descricao}</Text>
          {isSelected && (
            <View style={styles.containerIcon}>
              <FontAwesomeIcon
                name="angellist"
                size={responsive(35)}
                color={colors.rank2}
              />
              <Text style={styles.textoParticipando}>Participando</Text>
            </View>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

Item.propTypes = {
  grupo: PropTypes.objectOf(PropTypes.any).isRequired,
  vinculo: PropTypes.func.isRequired,
  deletarGrupo: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

Item.defaultProps = {
  isSelected: false,
};

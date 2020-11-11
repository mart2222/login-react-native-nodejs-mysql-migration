import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GrupoTypes} from '../../store/ducks/grupo';
import styles from './styles';

const ModalCadastroGrupo = ({close, isVisible}) => {
  const {loading} = useSelector((state) => state.grupo);
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const dispatch = useDispatch();

  const save = async () => {
    if (!descricao.trim()) {
      setErro('Preencha descrição para salvar!');
      return;
    }

    dispatch({
      type: GrupoTypes.SALVAR,
      descricao,
    });

    close();
  };

  function changeText(texto, setter) {
    setter(texto);
    if (!texto) {
      setErro('Preencha descrição para salvar!');
      return;
    }
    setErro(null);
  }

  return (
    <Modal
      onRequestClose={close}
      animationType="fade"
      transparent
      visible={isVisible}>
      <View style={styles.containerModal}>
        <View style={styles.containerModalConfig}>
          <Text style={styles.texto}>Novo grupo</Text>
          <View style={styles.contentNovoGrupo}>
            <Text style={styles.textoLabel}>Digite uma descrição</Text>
            <TextInput
              maxLength={30}
              onChangeText={(texto) => changeText(texto, setDescricao)}
              value={descricao}
              returnKeyType="done"
              style={styles.inputNovoGrupo}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
          </View>

          {loading && <Text style={styles.textoLoading}>Salvando...</Text>}
          {!!erro && <Text style={styles.textoErro}>{erro}</Text>}

          <View style={styles.contentBotao}>
            <TouchableOpacity style={styles.botaoModalOk} onPress={close}>
              <Text style={styles.textoBotaoModalOk}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoModalOk} onPress={save}>
              <Text style={styles.textoBotaoModalOk}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

ModalCadastroGrupo.propTypes = {
  close: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ModalCadastroGrupo;

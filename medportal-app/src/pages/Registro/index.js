import React, {useRef, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LoginTypes} from '../../store/ducks/login';
import styles from './styles';

function Registro() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [erro, setErro] = useState('');
  const {loading} = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const refInputPassword = useRef();
  const refInputPasswordVerify = useRef();

  function criar() {
    if (
      !login.trim() ||
      !name.trim() ||
      !password.trim() ||
      !passwordVerify.trim()
    ) {
      setErro('Preencha todos os campos para continuar!');
      return;
    }

    if (password.trim() !== passwordVerify.trim()) {
      setErro('A confirmação da senha esta errada!');
      return;
    }

    dispatch({
      type: LoginTypes.REGISTRAR,
      name,
      login,
      password,
    });
  }

  function changeText(texto, setter) {
    setter(texto);
    if (!texto) {
      setErro('Preencha todos os campos para continuar!');
      return;
    }
    setErro(null);
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require('./../../images/background.jpg')}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <Text style={styles.textoCriando}>Criando registro</Text>
      <View>
        <TextInput
          onSubmitEditing={() => refInputPassword.current.focus()}
          maxLength={50}
          placeholder="Nome"
          value={name}
          onChangeText={(texto) => changeText(texto, setName)}
          style={[styles.inputTexto, styles.inputMargin]}
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          onSubmitEditing={() => refInputPassword.current.focus()}
          maxLength={30}
          placeholder="Usuário"
          value={login}
          onChangeText={(texto) => changeText(texto, setLogin)}
          style={[styles.inputTexto, styles.inputMargin]}
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          ref={refInputPassword}
          onSubmitEditing={() => refInputPasswordVerify.current.focus()}
          maxLength={30}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={(texto) => changeText(texto, setPassword)}
          style={[styles.inputTexto, styles.inputMargin]}
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          ref={refInputPasswordVerify}
          maxLength={30}
          placeholder="Digite novamente a senha"
          secureTextEntry={true}
          value={passwordVerify}
          onChangeText={(texto) => changeText(texto, setPasswordVerify)}
          style={[styles.inputTexto, styles.inputMargin]}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {loading && <Text style={styles.textoLoading}>Criando...</Text>}
        {!!erro && <Text style={styles.textoErro}>{erro}</Text>}

        <TouchableOpacity
          style={[styles.botao, loading ? styles.botaoDisabled : {}]}
          onPress={criar}
          disabled={loading}>
          <Text style={styles.textoCriar}>Criar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Registro;

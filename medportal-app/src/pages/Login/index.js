/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  ImageBackground,
  Keyboard,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LoginTypes} from '../../store/ducks/login';
import {navigate} from './../../services/navigate';
import styles from './styles';
import {colors} from '../../styles';

function Login() {
  const [salvaLogin, setSalvaLogin] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const {loading} = useSelector((state) => state.login);
  const dispatch = useDispatch();

  async function verifyToken() {
    dispatch({
      type: LoginTypes.VERIFY_LOGIN,
    });
  }

  async function verifySalvaLogin() {
    try {
      const value = await AsyncStorage.getItem('@salvaLogin');
      setSalvaLogin(!!value);
      const acc = await AsyncStorage.getItem('@login/acc');
      if (acc) {
        const valueAcc = JSON.parse(acc);
        setUsuario(valueAcc.usuario);
        setSenha(valueAcc.senha);
      }
    } catch (err) {
      // console.log(err);
    }
  }

  async function changeSalvaLogin(value) {
    setSalvaLogin(value);
    if (value) {
      await AsyncStorage.setItem('@salvaLogin', 'true');
      return;
    }
    await AsyncStorage.removeItem('@salvaLogin');
  }

  useEffect(() => {
    verifyToken();
    verifySalvaLogin();
  }, []);

  async function entrar() {
    if (!usuario.trim() || !senha.trim()) {
      setErro('Preencha todos os campos para continuar!');
      return;
    }

    if (salvaLogin) {
      await AsyncStorage.setItem(
        '@login/acc',
        JSON.stringify({usuario, senha}),
      );
    } else {
      await AsyncStorage.removeItem('@login/acc');
    }

    Keyboard.dismiss();

    dispatch({
      type: LoginTypes.LOGIN,
      login: usuario,
      password: senha,
    });
  }

  function criarConta() {
    navigate('Registro');
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
      <Text style={styles.textoBemVindo}>Bem vindo!</Text>
      <View>
        <Text style={styles.textoLogin}>Login do sistema</Text>
        <TextInput
          maxLength={30}
          placeholder="Usuário"
          value={usuario}
          onChangeText={(texto) => changeText(texto, setUsuario)}
          style={styles.inputTexto}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          maxLength={30}
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={(texto) => changeText(texto, setSenha)}
          style={[styles.inputTexto, styles.inputSenha]}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.containerSaveLogin}>
          <CheckBox
            value={salvaLogin}
            onValueChange={changeSalvaLogin}
            tintColors={{true: colors.checked, false: '#fff'}}
          />
          <Text style={styles.textoSalvarLogin}>Salvar login</Text>
        </View>

        {loading && <Text style={styles.textoLoading}>Autenticando...</Text>}
        {!!erro && <Text style={styles.textoErro}>{erro}</Text>}

        <TouchableOpacity
          style={[styles.botao, loading ? styles.botaoDisabled : {}]}
          onPress={entrar}
          disabled={loading}>
          <Text style={styles.textoEntrar}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={criarConta}>
          <Text style={styles.textoCriarConta}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Login;

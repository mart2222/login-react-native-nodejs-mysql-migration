/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  StatusBar,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CardGrupo from '../../components/CardGrupo';
import {GrupoTypes} from '../../store/ducks/grupo';
import {colors, metrics} from './../../styles';
import styles from './styles';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIconsIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import ModalCadastroGrupo from '../../components/ModalCadastroGrupo';
import {LoginTypes} from '../../store/ducks/login';
import OneSignal from 'react-native-onesignal';
import {oneSignalAppId} from '../../../app.json';

const {responsive} = metrics;

function ListagemGrupo({navigation}) {
  const [showModalCadastroGrupo, setShowModalCadastroGrupo] = useState(false);

  const {loading, grupos} = useSelector((state) => state.grupo);
  const {loading: loadingLogin, vinculos} = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch({type: GrupoTypes.GET_GRUPOS});
    dispatch({type: LoginTypes.GET_VINCULOS});
  };

  const openModalGrupo = () => {
    setShowModalCadastroGrupo(true);
  };

  const closeModalGrupo = () => {
    setShowModalCadastroGrupo(false);
  };

  const logout = () => {
    Alert.alert(
      'Logout',
      'Deseja deslogar do sistema?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            dispatch({type: LoginTypes.LOGOUT});
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onIds = async (device) => {
    if (device && device.userId) {
      dispatch({
        type: LoginTypes.UPDATE_ONE_SIGNAL,
        onesignalId: device.userId,
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.botaoAddGrupo} onPress={logout}>
          <SimpleLineIconsIcon
            name="logout"
            size={responsive(30)}
            color={colors.iconHeader}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.botaoAddGrupo} onPress={openModalGrupo}>
          <FontAwesomeIcon
            name="plus"
            size={responsive(30)}
            color={colors.iconHeader}
          />
        </TouchableOpacity>
      ),
    });
    OneSignal.init(oneSignalAppId);
    OneSignal.addEventListener('ids', onIds);

    onRefresh();

    return () => {
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  const loadInFooter = () =>
    loading || loadingLogin ? (
      <View>
        <ActivityIndicator size={responsive(40)} />
      </View>
    ) : null;

  const isVinculado = (item) =>
    (vinculos || []).some((v) => v.grupoId === item.id);

  const renderItem = ({item}) => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    return <CardGrupo grupo={item} isSelected={isVinculado(item)} />;
  };

  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent />
      <FlatList
        onRefresh={onRefresh}
        refreshing={loading || loadingLogin}
        onEndReachedThreshold={0.4}
        ListFooterComponent={loadInFooter}
        data={grupos}
        renderItem={renderItem}
        keyExtractor={(a, i) => String(i)}
      />
      {showModalCadastroGrupo && (
        <ModalCadastroGrupo
          isVisible={showModalCadastroGrupo}
          close={() => closeModalGrupo()}
        />
      )}
    </>
  );
}

export default ListagemGrupo;

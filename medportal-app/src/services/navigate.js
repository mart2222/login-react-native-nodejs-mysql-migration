import {CommonActions} from '@react-navigation/native';

let navigator;

export function setNavigator(referencia) {
  navigator = referencia;
}

export function navigate(name, params, others) {
  navigator.dispatch(CommonActions.navigate({name, params, ...others}));
}

export function navigateReset(name, params, others) {
  navigator.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name, params, ...others}],
    }),
  );
}

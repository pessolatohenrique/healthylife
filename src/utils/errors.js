import { Toast } from 'native-base';

export const showToast = message => Toast.show({
  text: message,
  buttonText: 'Okay',
  duration: 3000,
  type: 'danger',
});

export const getErrorMessage = (error) => {
  const { response } = error;
  const { data } = response;
  let finalMessage = 'Ops! Algo deu errado';

  if (data[0] && data[0].message) {
    finalMessage = data[0].message;
  }

  return finalMessage;
};

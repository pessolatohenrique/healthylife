/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from "reactotron-react-native";

if (__DEV__) {
  const tron = Reactotron.configure({ host: "192.168.56.1"})
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}

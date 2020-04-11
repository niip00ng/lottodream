import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
    createStackNavigator,
    TransitionPresets,
  } from '@react-navigation/stack';
import MainPage from './src/view/MainPage';
import MyLotto from './src/view/MyLotto';
import Welcome from './src/view/WelcomeUser';
import InputWord from './src/view/InputWord';
import GenerateNumber from './src/view/GenerateNumber';
import NumberResult from './src/view/NumberResult';
import Admob from './src/view/Admob'
import DetailLotto from './src/view/DetailLotto'
const baseTransitionOption = {
    ...TransitionPresets.SlideFromRightIOS
}
const myLottoTransitionOption = {
    ...TransitionPresets.ModalSlideFromBottomIOS
}

const Stack = createStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="MainPage">
                <Stack.Screen name="MainPage" component={MainPage} options={baseTransitionOption}/>
                <Stack.Screen name="Admob" component={Admob}/>
                <Stack.Screen name="Welcome" component={Welcome} options={baseTransitionOption}/>
                <Stack.Screen name="InputWord" component={InputWord} options={baseTransitionOption}/>
                <Stack.Screen name="GenerateNumber" component={GenerateNumber} options={baseTransitionOption}/>
                <Stack.Screen name="NumberResult" component={NumberResult} options={baseTransitionOption}/>
                <Stack.Screen name="MyLotto" component={MyLotto} options={myLottoTransitionOption}/>
                <Stack.Screen name="DetailLotto" component={DetailLotto} options={baseTransitionOption}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

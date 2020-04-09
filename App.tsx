import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainPage from './src/view/MainPage';
import MyLotto from './src/view/MyLotto';
import Welcome from './src/view/WelcomeUser';
import InputWord from './src/view/InputWord';
import GenerateNumber from './src/view/GenerateNumber';
import NumberResult from './src/view/NumberResult';
import NumberResultTest from './src/view/NumberResultTest';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="NumberResultTest">
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="InputWord" component={InputWord} />
                <Stack.Screen name="GenerateNumber" component={GenerateNumber} />
                <Stack.Screen name="NumberResult" component={NumberResult} />
                <Stack.Screen name="NumberResultTest" component={NumberResultTest} />
                <Stack.Screen name="MyLotto" component={MyLotto} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

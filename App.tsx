import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    StatusBar,
    Alert
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainPage from './src/view/MainPage';
import NewLotto from './src/view/NewLotto';
import MyLotto from './src/view/MyLotto';

const Stack = createStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="MainPage">
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="MyLotto" component={MyLotto} />
                <Stack.Screen name="NewLotto" component={NewLotto} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

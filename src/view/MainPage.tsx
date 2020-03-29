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
import CustomButton from '../component/button/CustomButton';

declare var global: {
    HermesInternal: null | {}
};

const MainPage = ({navigation}) => {
    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <Button title="설정" onPress={() => Alert.alert('Left button pressed')}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.titleText}>꿈에나온</Text>
                <Text style={styles.titleText}>로또번호</Text>
            </View>
            <View style={styles.footer}>
                <CustomButton
                    buttonColor={'#023e71'}
                    titleColor={'white'}
                    title={'새로 만들기'}
                    onPress={() => Alert.alert('Left button pressed')}/>
                <CustomButton
                    buttonColor={'#023e71'}
                    titleColor={'white'}
                    title={'보관함'}
                    onPress={() => navigation.push('MyLotto')}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    all: {
        flex: 1,
        paddingTop: 20
    },
    header: {
        flex: 1,
        padding: 20,
        flexDirection: "row"
    },
    settingButton: {
        height: 50,
        width: 50
    },
    body: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 50,
        fontWeight: "bold"
    },
    footer: {
        flex: 2,
        padding: 20,
        paddingBottom: 50
    },
});

export default MainPage;

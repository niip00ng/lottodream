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
import Menu from '../../assets/svg/menu.svg';


declare var global: {
    HermesInternal: null | {}
};

const MainPage = ({navigation}:any) => {
    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.menuBtn}>
                    <Menu onPress={() => Alert.alert('Menu button click')}/>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>꿈에</Text>
                    <Text style={styles.titleText}>나온</Text>
                    <Text style={styles.titleText}>로또번호</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subText}>대충 꿈에 나온 것들로</Text>
                    <Text style={styles.subText}>숫자를 만들어서 로또를 만들어</Text>
                    <Text style={styles.subText}>보라는 세 줄 짜리 문구</Text>
                </View>
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
        paddingTop: 20,
        backgroundColor: "#E5E5E5"
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
    },
    menuBtn: {
        paddingLeft:20,
        height: 50,
        width: 50
    },
    mainTitle: {
        paddingLeft:40
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 40,
    },
    subTitle: {
        paddingLeft:40,
        paddingTop:30
    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 13,
        paddingTop:5,
    },
    footer: {
        flex: 2,
        padding: 20,
        paddingBottom: 50
    },
});

export default MainPage;

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, BackHandler, ToastAndroid} from 'react-native';
import CustomButton from '../component/button/CustomButton';
import Menu from '../../assets/svg/menu.svg';
const clickSafe = require('../util/click_safe')

const MainPage = (props : any) => {
    const [exit, setExit] = useState(false);

    useEffect(() => {
        //BackHandler.addEventListener("hardwareBackPress", handleBackButton);

        return() => {
            //BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
        };
    }, []);

    function handleBackButton() {
        let timeout = setTimeout(() => {
            console.log(111)
            setExit(false);
            clearTimeout(timeout);
        }, 2000);

        if (exit == undefined || !exit) {
            ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
            setExit(true);

            timeout
        } else {
            clearTimeout(timeout);
            BackHandler.exitApp(); // 앱 종료
        }
        return true;
    }

    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.menuBtn}>
                    <Menu onPress={() => {
                            if (clickSafe.safeClicked()) 
                                props.navigation.push('MyLotto')
                            }}/>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>꿈에</Text>
                    <Text style={styles.titleText}>나온</Text>
                    <Text style={styles.titleText}>로또번호</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subText}>에서 나온 것을 기억나는대로 입력하면</Text>
                    <Text style={styles.subText}>관련도가 높은 숫자를 출력합니다</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <CustomButton
                    action={() => {
                        BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
                        props
                            .navigation
                            .push('Welcome')
                    }}
                    title='행운 숫자 받기'/>
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
        flex: 6
    },
    menuBtn: {
        paddingLeft: 20,
        height: 50,
        width: 50
    },
    mainTitle: {
        paddingLeft: 40
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 40
    },
    subTitle: {
        paddingLeft: 40,
        paddingTop: 30
    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 13,
        paddingTop: 5
    },
    footer: {
        alignItems: 'flex-end',
        padding: 30,
        paddingBottom: 50
    }
});

export default MainPage;

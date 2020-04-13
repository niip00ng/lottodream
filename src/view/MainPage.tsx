import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, BackHandler, ToastAndroid, Dimensions} from 'react-native';
import CustomButton from '../component/button/CustomButton';
import Menu from '../../assets/svg/menu.svg';
import {verticalScale, horizontalScale, moderateScale} from '../util/scaling';
const { width, height } = Dimensions.get('window');
const clickSafe = require('../util/click_safe')

const MainPage = (props : any) => {
    const [exit, setExit] = useState(false);

    const [mainText, setMainText] = useState('')

    useEffect(() => {
        console.log('메인페이지 시작')
        //@ts-ignore
        Text.defaultProps = Text.defaultProps || {};     Text.defaultProps.allowFontScaling = false;
        setMainText('꿈에')
    }, [])

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
                    <Text style={styles.titleText}>{mainText}</Text>
                    <Text style={styles.titleText}>나온</Text>
                    <Text style={styles.titleText}>로또번호</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subText}>꿈에서 나온 것을 기억나는대로 입력하면</Text>
                    <Text style={styles.subText}>관련도가 높은 숫자를 출력합니다</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <CustomButton
                    active={true}
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
        paddingTop: verticalScale(20),
        backgroundColor: "#E5E5E5"
    },
    header: {
        flex: 1,
        padding: moderateScale(20),
        flexDirection: "row"
    },
    settingButton: {
        height: verticalScale(50),
        width: horizontalScale(50),
    },
    body: {
        flex: 6
    },
    menuBtn: {
        paddingLeft: horizontalScale(20),
        height: verticalScale(50),
        width: horizontalScale(50),
    },
    mainTitle: {
        paddingLeft: horizontalScale(40),
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(40),
    },
    subTitle: {
        paddingLeft: horizontalScale(40),
        paddingTop: verticalScale(30),
    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(15),
        paddingTop: verticalScale(5)
    },
    footer: {
        alignItems: 'flex-end',
        padding: moderateScale(30),
        paddingBottom: verticalScale(50)
    }
});

export default MainPage;

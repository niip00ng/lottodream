import React, {useEffect} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import Back from '../../assets/svg/back.svg' ;
import CustomButton from '../component/button/CustomButton';
const clickSafe =require('../util/click_safe')
import {verticalScale, horizontalScale, moderateScale} from '../util/scaling';

const WelcomeUser = (props:any) => {
    useEffect(() => {
        //@ts-ignore
        Text.defaultProps = Text.defaultProps || {};     Text.defaultProps.allowFontScaling = false;
        
        //@ts-ignore
        TextInput.defaultProps = TextInput.defaultProps || {};     TextInput.defaultProps.allowFontScaling = false;
    }, [])
    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.backBtn}>
                    <Back onPress={() => {
                        if(clickSafe.safeClicked()) props.navigation.goBack({key: 'MainPage'})
                    }} />
                    <View style={{paddingTop: 10, paddingLeft: 5}}><Text style={styles.headerTitle}>시작하기</Text></View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>환영합니다.</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subText}>꿈은 마음의 거울입니다. </Text>
                    <Text style={styles.subText}>예로부터 우리 조상은 꿈을 통해 미래를 점치고 예견했습니다.</Text>
                    <Text style={styles.subText}>꿈에서 나온 것을 최대한 많이 입력해주세요. 사람, 감정, 물건 무엇이든 상관없습니다. 해당 단어와 연관있는 숫자를 데이터에 근거해 산출합니다.</Text> 
                </View>
            </View>
            <View style={styles.footer}>
                <View>
                    <CustomButton active={true} action={() => props.navigation.push('InputWord')} title='시작하기'/>
                </View>
            </View>
        </View>
    )
}


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
        width: horizontalScale(50)
    },
    body: {
        flex: 6,
    },
    menuBtn: {
        paddingLeft:horizontalScale(20),
        height: verticalScale(50),
        width: horizontalScale(50)
    },
    mainTitle: {
        paddingLeft:horizontalScale(40),
        paddingTop: verticalScale(60)
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(40),
    },
    subTitle: {    
        padding:moderateScale(40)
    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(13),
        lineHeight: verticalScale(30),
    },
    footer: {
        alignItems: 'flex-end',
        padding: moderateScale(30),
        paddingBottom: verticalScale(50)
    },
    backBtn: {
        paddingLeft:horizontalScale(10),
    },
    headerTitle: {
        fontSize: moderateScale(13),
    },
});

export default WelcomeUser;
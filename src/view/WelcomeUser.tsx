import React from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Back from '../../assets/svg/back.svg' ;
import CustomButton from '../component/button/CustomButton';
const clickSafe =require('../util/click_safe')

const WelcomeUser = (props:any) => {
    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.backBtn}>
                    <Back onPress={() => {
                        if(clickSafe.safeClicked()) props.navigation.goBack({key: 'MainPage'})
                    }} />
                    <View style={{paddingTop: 10, paddingLeft: 5}}><Text>시작하기</Text></View>
                    
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
                    <CustomButton action={() => props.navigation.push('InputWord')} title='시작하기'/>
                </View>
            </View>
        </View>
    )
}


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
        paddingLeft:40,
        paddingTop:60
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 40,
    },
    subTitle: {    
        padding:40
    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 13,
        width:350,
        lineHeight: 30,
    },
    footer: {
        alignItems: 'flex-end',
        flex: 1,
        padding: 30,
        paddingBottom: 30
    },
    backBtn: {
        paddingLeft:10,
        height: 50,
        width: 100
    },
});

export default WelcomeUser;
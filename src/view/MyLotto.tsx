import React , {useState, useEffect} from 'react';
import {
    FlatList,
    StyleSheet,
    ScrollView,
    View,
    Text,
} from 'react-native';
import LottoCardGroup from '../component/card/LottoCardGroup'
import Back from '../../assets/svg/back.svg' ;
import AsyncStorage from '@react-native-community/async-storage';
import BackModal from '../component/modal/BackWarning';
const constant = require('../util/Constant')
const clickSafe =require('../util/click_safe')

const MyLotto = (props:any) => {

    const [myLotto, setMyLotto] = useState([]);

    // 나의 로또 정보 가져오기
    const retrieveData = async (key : string) => {
        try {
            let value = await AsyncStorage.getItem(key);
            if (value === null) return ;
            console.log(value)
            //@ts-ignore
            const lottoData = JSON.parse(value);
            setMyLotto(lottoData);
        
        } catch (error) {
            console.log('::: AsyncStorage get ERROR !! ')
        }
    }

    // 초기화
    useEffect(() => {
        retrieveData(constant.LOTTO_KEY);
    }, [])
    const viewabilityConfig = {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 95
    }
    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.backBtn}>
                    <Back onPress={() => {
                        if(clickSafe.safeClicked()) props.navigation.goBack({key: 'MainPage'})
                    }} />
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>보관함</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subText}>추출한 해몽 숫자를 보관하는 곳입니다.</Text>
                </View>
                <View style={styles.bodyContents}>
                    <FlatList 
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        keyExtractor={(item, index) => String(index)}
                        data={myLotto}
                        renderItem={({item}) => 
                        <View style={styles.lottoCard}>
                            <LottoCardGroup name={item.name} status={item.status} date={item.date} numbers={item.numbers}/>
                        </View>
                        }
                        />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    all: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#E5E5E5"
    },
    header: {
        flex: 1,
        padding: 20,
        flexDirection: "row"
    },
    body: {
        flex: 11,
        justifyContent: 'center',
        
    },
    backBtn: {
        paddingLeft:10,
        height: 50,
        width: 50
    },
    settingButton: {
        height: 50,
        width: 50
    },
    titleText: {
        fontSize: 40,
        fontFamily: "NanumMyeongjo",
    },
    mainTitle: {
        paddingLeft:40
    },
    subTitle: {
        paddingLeft:40,
        paddingTop:20
    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 15,
        paddingTop:5,
    },
    bodyTitle: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 50
    },
    bodyContents: {
        flex: 7,
        padding: 10,
        paddingTop:50, 
    },
    lottoCard: {
        height: 170 ,
        backgroundColor: '#ced4da',
        borderRadius: 19
    },
    button: {
        width: 120,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'gray',
        justifyContent: 'center',
        borderRadius: 10
    },
    title: {
        fontSize: 15
    },
});

export default MyLotto;
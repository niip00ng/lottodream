import React , {useState, useEffect} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
} from 'react-native';
import LottoCardGroup from '../component/card/LottoCardGroup'
import Back from '../../assets/svg/back.svg' ;
import AsyncStorage from '@react-native-community/async-storage';


const MyLotto = (props:any) => {
    const Constant = require('../util/Constant')
    const [myLotto, setMyLotto] = useState(    []);

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
        retrieveData(Constant.LOTTO_KEY);
    }, [])

    
    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.backBtn}>
                    <Back onPress={() => props.navigation.goBack()} />
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>보관함</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subText}>대충 저장한 번호를 볼 수 있는 곳이라는 문구</Text>
                </View>
                <View style={styles.bodyContents}>
                    <ScrollView 
                    showsVerticalScrollIndicator={false}>
                        {
                            myLotto.map((item, index) => (
                                    <View style={styles.lottoCard} key={index}>
                                        <LottoCardGroup name={item.name} status={item.status} date={item.date} numbers={item.numbers}/>
                                    </View>
                                ))
                        }
                    </ScrollView>
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
        fontSize: 13,
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
        height: 170  
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
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});

export default MyLotto;
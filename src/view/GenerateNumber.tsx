import React, {useState, useEffect} from 'react'
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
import Back from '../../assets/svg/back.svg' ;
import LoadStart from '../../assets/lottie/loading_start.json' ;
import LoadEnd from '../../assets/lottie/loading_end.json' ;
import ShowResultOffBtn from '../../assets/svg/show_result.svg' ;
import ShowResultOnBtn from '../../assets/svg/show_result_on.svg' ;
import CustomButton from '../component/button/CustomButton';
import LottieView from 'lottie-react-native'
const clickSafe =require('../util/click_safe')

// 애드몹 광고
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7024707494100333/8967630979';


const GenerateNumber = (props : any) => {

    const [finish, setFinish] = useState(false)
    const [numbers, setNumber] = useState([])
    const [dreams, setDreams] = useState([])
    const [bonus, setBonus] = useState('')
    const [loaded, setLoaded] = useState(false);
    const genLib = require('../util/recommandLib')

    // 애드몹 인스턴스
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      });
    useEffect(() => {
        
        const eventListener = readyAdmob()

        const origin = genLib.generateLotto(props.route.params.words);
        console.log('GenerateNumber 결과 origin : ',  origin)
        const bonus = origin[origin.length-1]
        const dream = genLib.getDreamNumber(origin)
        let desc = genLib.getBonusWithArray(dream)

        console.log('GenerateNumber 꿈 목록 : ',  props.route.params.words)
        console.log('GenerateNumber 드림넘버 : ',  dream)
        console.log('GenerateNumber 정렬넘버 : ',  desc)
        console.log('GenerateNumber 보너스수 : ',  bonus)
        const data = genLib.makeResultNumbersFormat(desc, origin, props.route.params.words)
        
        setNumber(desc)
        setDreams(data)
        setBonus(bonus)

        setTimeout(() => {
            setFinish(!finish)
        }, 4000)



        return () => {
            eventListener();
        }
    }, [])
    

    // 애드몹 초기화 및 핸들러 등록
    function readyAdmob () {

        interstitial.load();
        
        return interstitial.onAdEvent(type => {
            
            console.log('adunit id : ', adUnitId)
            console.log('type : ', type)
            if (type === AdEventType.LOADED) {
                setLoaded(true)
                //interstitial.show()
            }

            if(type === AdEventType.CLOSED) {
                console.log('close')
            }
        });;
    }


    function showResultButton () {
        if(finish) return (
            <CustomButton action={() => props.navigation.replace('NumberResult', {
                nums: numbers,
                dreams: dreams,
                bonus: bonus
            })} title='결과 보기'/>
        )

        return <ShowResultOffBtn/>
    }
    function nowStatusView () {
        if(finish) {
            return (
                <View style={styles.body}>
                    <View style={styles.lottieEnd}>
                        <LottieView
                            source={LoadEnd}
                            autoPlay
                            loop={false}
                        />
                    </View>
                    <View style={styles.mainTitle}>
                        <Text style={styles.titleText}>숫자를</Text>
                        <Text style={styles.titleText}>추출하였습니다.</Text>
                    </View>
                    <View style={styles.subTitle}>
                        <Text style={styles.subText}>아래 결과보기 버튼을 눌러서</Text>
                        <Text style={styles.subText}>행운의 숫자를 확인해보세요.</Text>
                    </View>
                </View>
            )            
        }  
        return (
            <View style={styles.loading}>
                <View style={styles.lottie}>
                    <LottieView
                        source={LoadStart}
                        autoPlay loop
                    />
                </View>
                <View style={{paddingTop:30, paddingLeft:10}}>
                    <Text>숫자를 추출 중입니다...</Text>
                </View>
            </View>
        )      
    }

    return ( 
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.backBtn}>
                    <Back onPress={() => {
                        if(clickSafe.safeClicked()) props.navigation.goBack({key: 'MainPage'})
                    }} />
                    <View style={{paddingTop: 10, paddingLeft: 5}}><Text>숫자추출하기</Text></View>
                </View>
            </View>
            {nowStatusView()}
            <View style={styles.footer}>
                <View>
                    {showResultButton()}
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
    lottieEnd : {
        alignItems: 'center',
        padding: 100,
    },
    lottie : {
        padding: 100,
    },
    loading: {
        flex: 6,
        marginTop:50,
        alignItems: 'center'
    },
    body: {
        flex: 6,
        marginTop:50,
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

export default GenerateNumber;
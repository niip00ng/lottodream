import React, {useState, useEffect} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    StatusBar,
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
import {verticalScale, horizontalScale, moderateScale} from '../util/scaling';

const GenerateNumber = (props : any) => {
    useEffect(() => {
        //@ts-ignore
        Text.defaultProps = Text.defaultProps || {};     Text.defaultProps.allowFontScaling = false;
    }, [])
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
        console.log('GenerateNumber 전달할 데이터 : ',  data)
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
                interstitial.show()
            }

            if(type === AdEventType.CLOSED) {
                console.log('close')
            }
        });;
    }


    function showResultButton () {
        if(finish) return (
            <CustomButton active={true} action={() => props.navigation.replace('NumberResult', {
                nums: numbers,
                dreams: dreams,
                bonus: bonus
            })} title='결과 보기'/>
        )

        return  <CustomButton active={false} action={() => {}} title='결과 보기'/>
    }
    function nowStatusView () {
        if(finish) {
            return (
                <View style={styles.body}>
                    <View style={{alignItems: 'center'}}>
                        <LottieView
                            style={styles.lottieEnd}
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
                <View>
                    <LottieView
                        style={styles.lottie}
                        source={LoadStart}
                        autoPlay loop
                    />
                </View>
                <View style={{paddingTop:verticalScale(20), paddingLeft:horizontalScale(10)}}>
                    <Text style={styles.genText}>숫자를 추출 중입니다...</Text>
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
                    <View style={{paddingTop: verticalScale(10), paddingLeft: horizontalScale(5)}}><Text style={styles.headerTitle}>숫자추출하기</Text></View>
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
        paddingTop: verticalScale(20),
        backgroundColor: "#E5E5E5"
    },
    header: {
        flex: 1,
        padding: moderateScale(20),
        flexDirection: "row"
    },
    lottieEnd : {
        width: horizontalScale(180),
        height : verticalScale(180)
    },
    lottie : {
        width: horizontalScale(180),
        height : verticalScale(180)
    },
    loading: {
        flex: 6,
        marginTop:verticalScale(50),
        alignItems: 'center'
    },
    body: {
        flex: 8,
    },
    menuBtn: {
        paddingLeft:horizontalScale(20),
        height: verticalScale(50),
        width: horizontalScale(50)
    },
    mainTitle: {
        paddingLeft:horizontalScale(40),
        paddingTop:verticalScale(60)
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(40),
    },
    subTitle: {    
        padding:moderateScale(40)
    },
    genText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(15),
    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(15),
        width:horizontalScale(350),
        lineHeight: verticalScale(30),
    },
    footer: {
        alignItems: 'flex-end',
        paddingRight: horizontalScale(30),
        paddingBottom: verticalScale(50)
    },
    backBtn: {
        paddingLeft:horizontalScale(10),
    },
    headerTitle: {
        fontSize: moderateScale(13),
    },
});

export default GenerateNumber;
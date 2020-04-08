import React , {useState, useRef,useEffect }from 'react'
import {
    Platform,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    Alert
} from 'react-native';
import Back from '../../assets/svg/back.svg' ;
import WelcomeStartBtn from '../../assets/svg/welcome_start.svg';
import SaveModal from '../component/modal/SaveNumbers';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
const Constant = require('../util/Constant')
const NumberResult = (props : any) => {

    const [dateTitle, setDateTitle] = useState('')
    const [nowDate, setNowDate] = useState('')
    const modalOpen = useRef()

    const onClick = () => {
        //@ts-ignore
        modalOpen.current.handleOpen();
    };
    
    const moveMyLotto = (dreamName: string) => {
        
        let numList = props.route.params.nums
        let dreamList = props.route.params.dreams

        if(numList.length <7) {
            numList.push(props.route.params.bonus)
            dreamList.push('')
        }

        const newItem = {
            name: dreamName,
            status: 0,
            round: '',
            date: nowDate,
            dreams: dreamList,
            numbers: numList,
        };
        
        console.log(newItem)

        
        //잘 저장 되었을
        saveNewLotto(Constant.LOTTO_KEY, newItem);
    }

    const clickSaveButton = () => {
        let lottos = []


    }

    const storeData = async (key: string, value: any) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('::: AsyncStorage set ERROR !! ')
            return false
        }
    
        return true
    };

    
    const saveNewLotto = async (key : string, data:{}) => {
        try {
            let value = await AsyncStorage.getItem(key);
            if (value === null) {
                console.log('널값 ',value); 
                //@ts-ignore
                value = JSON.stringify({ "lottoList": []});
                console.log('널값이후 ',value); 
            }
            
            //@ts-ignore
            const lottoData = JSON.parse(value);
            console.log('널값 ',lottoData); 
            let lottoList = lottoData.lottoList
            console.log('널값 ',lottoList); 
            lottoList.push(data)
            
            console.log('retrieveData 내부값 : ', lottoList);
            
            if(storeData(Constant.LOTTO_KEY, JSON.stringify(lottoList))) {
                console.log('SAVE SUCCESS');
                console.log('보관함으로 이동')
                props.navigation.replace('MyLotto')
            }
            else {
                console.log('SAVE fail');
            }
            
        } catch (error) {
            console.log('::: AsyncStorage get ERROR !! ')
        }
    };

    const retrieveData = async (key : string) => {
        try {
            let value = await AsyncStorage.getItem(key);
            if (value === null) return console.log('retrieveData 없음 ');; 
            console.log('retrieveData 내부값 : ', value);
        } catch (error) {
            console.log('::: AsyncStorage get ERROR !! ')
        }
    }

    useEffect( () => {
        let date = moment(new Date()).format('YYYY-MM-DD-HH-mm-ss');
        let token = date.split('-')

        // 실제 데이터 저장할 포멧
        setNowDate(token[0]+'.'+token[1]+"."+token[2]+'  '+token[3]+":"+token[4]+":"+token[5])
        
        // 화면에 표시할 데이트 포멧
        setDateTitle(token[0]+'년 '+token[1]+'월 '+token[2]+'일')
        
        //AsyncStorage.removeItem(Constant.LOTTO_KEY);

        retrieveData(Constant.LOTTO_KEY);
    }, [])



    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.todayView}>
                    <View><Text style={styles.todayTitle}>{dateTitle}</Text></View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>당신의</Text>
                    <Text style={styles.titleText}>해몽 숫자는</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{flex:2}}>
                    <View style={styles.rectangle} >
                        <Text style={styles.button} onPress={() => Alert.alert('다시하기')}>다시하기</Text>
                    </View>
                </View>
                <View style={{flex:1}}>

                </View>
                <View style={{flex:2}}>
                    <View style={styles.rectangle}>
                        <Text style={styles.button} onPress={onClick}>저장하기</Text>
                    </View>
                </View>
            </View>
            <SaveModal ref={modalOpen} end={moveMyLotto}/>
        </View>
    )
}


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },    
    text: {
        color: "black",
        fontSize: 22
    },
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
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 32,
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
        flexDirection: 'row',
        flex: 1,
    },
    todayView: {
        paddingLeft:10,
        height: 80,
        width: 300
    },
    todayTitle: {
        fontFamily: "NanumMyeongjo",
        fontSize: 18,
    },
    button: {
        fontFamily: "NanumMyeongjo",
        fontSize: 20,
    },
    recView : {
        alignItems: 'center',
    },
    rectangle: {
        alignSelf:'center',
        borderWidth: 1,
        borderBottomColor: '#383838',
        borderLeftColor: '#00ff0000',
        borderTopColor: '#00ff0000',
        borderRightColor: '#00ff0000',
        width: 80,
        height: 30,
        backgroundColor: '#E5E5E5',
      }
});

export default NumberResult;
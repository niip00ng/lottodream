import React , {useState, useRef,useEffect }from 'react'
import {
    Platform,
    StyleSheet,
    ScrollView,
    View,
    Text,
    BackHandler,
    KeyboardAvoidingView
} from 'react-native';

import SaveModal from '../component/modal/SaveNumbers';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import El from '../../assets/svg/el.svg';
import NumberCard from './number_result/NumberCard'
import BackModal from '../component/modal/BackWarning';
import nextId from "react-id-generator";

const clickSafe =require('../util/click_safe')
const constant = require('../util/Constant')


const NumberResult = (props : any) => {

    const [dateTitle, setDateTitle] = useState('')
    const [nowDate, setNowDate] = useState('')
    const modalOpen = useRef()

    const backModalOpen = useRef()

    // Back버튼 모달 펼치기
    const onClickBack = () => {
        //@ts-ignore
        backModalOpen.current.handleOpen();
    };
    
    const [params, setParams] = useState([])
    const onClick = () => {
        //@ts-ignore
        modalOpen.current.handleOpen();
    };
    useEffect(() => {
        //@ts-ignore
        Text.defaultProps = Text.defaultProps || {};     Text.defaultProps.allowFontScaling = false;
    }, [])

    // 꿈이름 넘어와서 저장
    const confirmDreamName = (dreamName: string) => {
        
        let numList = props.route.params.nums
        let dreamList = props.route.params.dreams

        if(numList.length <7) {
            numList.push(props.route.params.bonus)
            dreamList.push('')
        }


        const newItem = {
            id: '',
            name: dreamName,
            status: 0,
            round: '',
            date: nowDate,
            dreams: dreamList,
            numbers: numList,
        };
        
        console.log(newItem)

        
        //잘 저장 되었을
        saveNewLotto(constant.LOTTO_KEY, newItem);
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

    // 저장!!!
    const saveNewLotto = async (key : string, data:{}) => {
        try {
            let value = await AsyncStorage.getItem(key);
            let id = 0;
            if (value === null) {
                //@ts-ignore
                value = JSON.stringify([]);
            }
            
            //@ts-ignore
            const lottoData = JSON.parse(value);
            console.log('lottoData ',lottoData); 
            
            if(lottoData.length!==0) id = lottoData[0].id + 1;

            //@ts-ignore
            data.id = id
            lottoData.unshift(data)
            
            console.log('saveNewLotto 내부값 : ', lottoData);
            
            if(storeData(constant.LOTTO_KEY, JSON.stringify(lottoData))) {
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

        // array 복사
        //let cNum = JSON.parse(JSON.stringify(props.route.params.nums))
        let cWords = JSON.parse(JSON.stringify(props.route.params.dreams))

        let params = []

        // 단어 길이조절
        for(let i in cWords) {
            cWords[i] = cWords[i].replace(/ /g,"")
            if(cWords[i].length >= 6){
                let index = 4;
                if(cWords[i].length === 6) index = 3;
                cWords[i] = [cWords[i].slice(0, index), '\n ', cWords[i].slice(index)].join('');
            }

            params.push({
                'number' : props.route.params.nums[i],
                'word' : cWords[i]
            })
        }

        params.push({
            'number' : props.route.params.bonus,
            'word' : '보너스'
        })
        
        console.log('NumberResult : ', params)
        //@ts-ignore
        setParams(params)

        // 실제 데이터 저장할 포멧
        setNowDate(token[0]+'.'+token[1]+"."+token[2]+'  '+token[3]+":"+token[4]+":"+token[5])
        
        // 화면에 표시할 데이트 포멧
        setDateTitle(token[0]+'년 '+token[1]+'월 '+token[2]+'일')
    }, [])

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
          };
    }, [handleBackButton])

    function handleBackButton () {
        //@ts-ignore
        backModalOpen.current.handleOpen();
        return true;
    }
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
                <View style={styles.cardSet}>
                    <View style={styles.eltop}>
                        <View>
                            <El/>
                        </View>
                        <View style={{ transform: [{ rotate: "90deg" }]}}>
                            <El/>
                        </View>
                    </View>
                    <NumberCard params={params}/>
                    <View style={styles.eltop}>
                        <View style={{ transform: [{ rotate: "270deg" }]}}>
                            <El/>
                        </View>
                        <View style={{ transform: [{ rotate: "180deg" }]}}>
                            <El/>
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.footer}>
                <View style={{flex:1, marginLeft: 40}}>
                    <View style={[styles.rectangle]} >
                        <Text style={styles.button} onPress={() => {
                            //if(clickSafe.safeClicked()) props.navigation.replace('InputWord')
                            if(clickSafe.safeClicked()) onClickBack();
                        }}>다시하기</Text>
                    </View>
                </View>
                <View style={{flex:1, alignItems: 'flex-end', marginRight: 30}}>
                    <View style={[styles.rectangle]}>
                        <Text style={styles.button} onPress={ () => {
                            if(clickSafe.safeClicked()) onClick()
                        }}>저장하기</Text>
                    </View>
                </View>
            </View>
            
            <SaveModal ref={modalOpen} end={confirmDreamName}/>
            <BackModal title='처음부터 다시 진행하시겠습니까?' ref={backModalOpen} action={() => {
                BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
                props.navigation.goBack()
            }}/>

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
        flex: 15,
        paddingBottom: 40
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
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 40,
    },
    todayView: {
        paddingLeft:10,
        height: 50,
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
    rectangle: {
        borderWidth: 1,
        borderBottomColor: '#383838',
        borderLeftColor: '#00ff0000',
        borderTopColor: '#00ff0000',
        borderRightColor: '#00ff0000',
        width: 90,
        height: 30,
        alignItems:'center',
        backgroundColor: '#E5E5E5',
    },
      cardSet : {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        paddingTop: 40,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    eltop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default NumberResult;
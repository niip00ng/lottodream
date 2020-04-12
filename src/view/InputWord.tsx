import React, {useState, useRef, useEffect} from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    View,
    Text,
    TextInputSubmitEditingEventData,
    NativeSyntheticEvent,
    BackHandler
} from 'react-native';
import Back from '../../assets/svg/back.svg' ;
import GenerateNumberOn from '../../assets/svg/gen_number_on.svg' ;
import GenerateNumberOff from '../../assets/svg/gen_number_off.svg' ;
import CustomButton from '../component/button/CustomButton';
import { TextInput } from 'react-native-gesture-handler';
import {Badge} from 'react-native-elements';
import Recommand from '../component/list/Recommend'
import BackModal from '../component/modal/BackWarning';
import BasicWarning from '../component/modal/BasicWarning';
import {verticalScale, horizontalScale, moderateScale} from '../util/scaling';

const clickSafe =require('../util/click_safe')

const InputWord = (props:any) => {
    const [value, onChangeText] = useState('');
    const [word, setWord] = useState([]);
    const modalOpen = useRef();
    const modalAlertOpen = useRef();
    const [title, setTitle] = useState('')

    // Back버튼 모달 펼치기
    const onClick = () => {
        if(word.length ===0 && value.length ===0) return props.navigation.goBack();

        //@ts-ignore
        modalOpen.current.handleOpen();
    };


    // next 버튼 활성화
    function activateButton () {
        if(word.length < 6) return <CustomButton title='숫자 추출하기' active={false} action={() => {}}/>
        
        return <CustomButton active={true} action={() => {sendNext()}} title='숫자 추출하기'/>
    }

    function changeText(text:string){
        onChangeText(text)
    }


    function sendNext() {
        props.navigation.replace('GenerateNumber', {
            words: word
        })
    }
    // 단어입력시 공간활용을 위해 잠시삭제
    function cleanView () {
        if(word.length ===0 && value.length ===0) {
            return (
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>꿈에서</Text>
                    <Text style={styles.titleText}>무엇을 봤습니까?</Text>
                </View>
            )
        } 
        return ;
    }

    // 단어입력시 공간활용을 위해 잠시삭제
    function componentTitle () {
        if(word.length ===0 && value.length ===0) {
            return (
                <View style={{paddingTop: verticalScale(10), paddingLeft: horizontalScale(5)}}><Text style={styles.headerTitle}>단어 입력하기</Text></View>
            )
        } 
        return ;
    }

    // 단어를 6개 모두 선택면 텍스트 입력창 삭제
    function activateTextInput () {
        
        if(word.length === 6) return
        
        return (
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1}}>    
                <TextInput
                    style={styles.editBox}
                    editable
                    maxLength={8}
                    placeholder='단어를 입력하세요'
                    numberOfLines={1}
                    onChangeText={(text:string) => changeText(text)}
                    onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                        addWord(e.nativeEvent.text)}}
                    value={value} />
            </View>
        )
    }

    // 내가 선택한 단어 뱃지 보여주기
    function wordList () {
        return word.map((candidate ,index)=> {
            if(candidate!='')
            return (
                <View style={{padding: moderateScale(5)}} key={index}>
                    <Badge value={
                        <Text style={styles.candidateWord}>{candidate} ×</Text> 
                        } 
                        badgeStyle={styles.badgeStyle} 
                        textStyle={styles.badgeText} 
                        onPress={() => {removeWord(candidate)}}/>
                </View>
            );
        });
    }

    // 추천 단어 보여주기
    function showRecommand () {
        if(value.length !==0) {
            return(                    
                <View style={styles.recommendFrame}>
                    <Recommand in={value} add={addRecommand} value={value}/>
                </View>
            )
        }
    }

        // 추천 단어 보여주기
    function wordCountView() {
        if (value.length !== 0 || word.length !== 0) {
            return (
                <View style={styles.wordCount}>
                    <Text
                        style={{
                            fontFamily: "NanumMyeongjo",
                            fontSize: moderateScale(19)
                        }}>{word.length} / 6</Text>
                </View>
            )
        }
    }

    // 추천 선택 단어 뱃지추가
    function addRecommand (e:string) {
        if(e!== undefined || e !== null || e!== '') addWord(e)
    }

    // 산텍 딘어 삭제
    function removeWord (w: string | number) {
        setWord([...word.filter(e => e !== w)])
    }

    // 산텍 딘어 추가
    function addWord (e: string) {
        
        if(value === '' || e === undefined) {
            setTitle('글자를 입력해주세요.')
            //@ts-ignore
            modalAlertOpen.current.handleOpen();
        }
        //@ts-ignore
        console.log('선택한 단어', e, word.indexOf(e))
        
        //@ts-ignore
        if(word.indexOf(e) !== -1) {
            
            setTitle('이미 선택한 단어입니다.')
            //@ts-ignore
            modalAlertOpen.current.handleOpen();
            return onChangeText('')    
        }
        //@ts-ignore
        setWord([...word, e]);
        onChangeText('')
    }

    useEffect(() => {
        //@ts-ignore
        Text.defaultProps = Text.defaultProps || {};     Text.defaultProps.allowFontScaling = false;
        //@ts-ignore
        TextInput.defaultProps = Text.defaultProps || {};     TextInput.defaultProps.allowFontScaling = false;
        
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
          };
    }, [handleBackButton])
    function handleBackButton () {
        console.log(word.length, value.length)
        if(word.length ===0 && value.length ===0) {
            
            BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
            return false;
        }

        //@ts-ignore
        modalOpen.current.handleOpen();
        return true;
    }
    return (
        <View style={styles.all}>
            <KeyboardAvoidingView behavior={Platform.OS == "android" ? "height" : "padding"} style={styles.keyboardAvoid}>
                <View style={styles.header}>
                    <View style={styles.backBtn}>
                        <Back onPress={() => {
                            if(clickSafe.safeClicked()) onClick()
                        }} />
                        {componentTitle()}
                    </View>
                    <View style={{flex:1, alignItems:'flex-end' , marginRight: horizontalScale(10)}}>
                        {wordCountView()}
                    </View>
                </View>
                <View style={styles.body}>
                    {cleanView()}
                    <View style={styles.subTitle}>
                        <View style={styles.wordList}>
                            {wordList()}
                        </View>
                        {activateTextInput()}
                        {showRecommand()}
                    </View>

                </View>

            </KeyboardAvoidingView>
            
            <View style={styles.footer}>
                <View>
                    {activateButton()}
                </View>
            </View>
            <BasicWarning title={title} ref= {modalAlertOpen}/>
            <BackModal ref={modalOpen} title='입력을 취소하고 뒤로 가시겠습니까?' action={() => {
                props.navigation.goBack()
            }}/>

        </View>
    )
}


const styles = StyleSheet.create({
    all: {
        flex: 1,
        paddingTop: verticalScale(20),
        backgroundColor: "#E5E5E5"
    },
    keyboardAvoid: {
        flex: 8
      },
    header: {
        flex: 1,
        padding: moderateScale(20),
        flexDirection: "row"
    },
    body: {
        flex: 7,
    },
    menuBtn: {
        paddingLeft:horizontalScale(20),
        height: verticalScale(50),
        width: horizontalScale(50)
    },
    mainTitle: {
        paddingLeft:horizontalScale(40),
        paddingTop:verticalScale(60),
        paddingBottom:verticalScale(40)
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(30),
    },
    subTitle: {    
        paddingBottom:verticalScale(40),
        paddingLeft:horizontalScale(40),
        paddingRight:horizontalScale(40),

    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(13),
        width:horizontalScale(350),
        lineHeight: verticalScale(30),
    },
    footer: {
        alignItems: 'flex-end',
        padding: moderateScale(30),
        paddingBottom: verticalScale(50),
    },
    backBtn: {
        paddingLeft:horizontalScale(10),
    },editBox : {
        height : horizontalScale(55),
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(20),
    },wordList : {
        flexDirection: "row",
        flexWrap: "wrap"
    },wordCount : {
        padding: moderateScale(10),
        flexDirection: "row",
        flexWrap: "wrap"
        
    }, candidateWord : {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(15),
    }, badgeStyle:{ 
        borderColor: '#383838', 
        borderWidth:horizontalScale(0.5),
        backgroundColor: "#00ff0000",
        padding:moderateScale(12),
        borderRadius:100
    }, badgeText: {
        fontFamily: "NanumMyeongjo",
        backgroundColor: "#00ff0000"
    },recommendFrame :{
        height: verticalScale(400)
    },
    headerTitle: {
        fontSize: moderateScale(13),
    },
});


export default InputWord;
import React from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    View,
    Text,
    Button,
    StatusBar,
    Alert
} from 'react-native';
import Back from '../../assets/svg/back.svg' ;
import WelcomeStartBtn from '../../assets/svg/welcome_start.svg' ;
import GenerateNumberOn from '../../assets/svg/gen_number_on.svg' ;
import GenerateNumberOff from '../../assets/svg/gen_number_off.svg' ;
import BtnX from '../../assets/svg/btn_x.svg' ;
import { TextInput } from 'react-native-gesture-handler';
import {Badge} from 'react-native-elements'
const InputWord = (props:any) => {
    const [value, onChangeText] = React.useState('');
    const [word, setWord] = React.useState([]);


    function activateButton () {
        if(word.length < 6) return <GenerateNumberOff/>
        
        return <GenerateNumberOn onPress={() => props.navigation.push('GenerateNumber')}/>
    }

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

    function componentTitle () {
        if(word.length ===0 && value.length ===0) {
            return (
                <View style={{paddingTop: 10, paddingLeft: 12}}><Text>단어 입력하기</Text></View>
            )
        } 
        return ;
    }
    function activateTextInput () {
        
        if(word.length === 6) return
        
        return (
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 2}}>    
                <TextInput
                    style={styles.editBox}
                    editable
                    maxLength={40}
                    placeholder='단어를 입력하세요'
                    numberOfLines={1}
                    onChangeText={(text:string) => onChangeText(text)}
                    onSubmitEditing={addWord}
                    value={value} />
            </View>
        )
    }

    function wordList () {
        return word.map((candidate ,index)=> {
            return (
                <View style={{padding: 5}} key={index}>
                    <Badge value={
                        <Text style={styles.candidateWord}>{candidate}</Text> 
                        } 
                        badgeStyle={styles.badgeStyle} 
                        textStyle={styles.badgeText} 
                        onPress={() => {removeWord(candidate)}}/>
                </View>
            );
        });
    }
    function removeWord (w: never) {
        word.splice(w, 1)
        setWord([...word])
    }
    function addWord () {
        
        if(value === '') {
            Alert.alert('글자를 입력해주세요.');
            return
        }
        setWord([...word, value]);        
        onChangeText('')

    }

    return (
        <View style={styles.all}>

            <KeyboardAvoidingView behavior={Platform.OS == "android" ? "height" : "padding"} style={styles.keyboardAvoid}>
                <View style={styles.header}>
                    <View style={styles.backBtn}>
                        <Back onPress={() => props.navigation.goBack()} />
                        {componentTitle()}
                    </View>
                </View>
                <View style={styles.body}>
                    {cleanView()}
                    <View style={styles.subTitle}>
                        <View style={styles.wordList}>
                            {wordList()}
                        </View>
                        {activateTextInput()}
                    </View>
                </View>

            </KeyboardAvoidingView>
            <View style={styles.footer}>
                <View>
                    {activateButton()}
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
    keyboardAvoid: {
        flex: 8
      },
    header: {
        flex: 1,
        padding: 20,
        flexDirection: "row"
    },
    body: {
        flex: 7,
    },
    menuBtn: {
        paddingLeft:20,
        height: 50,
        width: 50
    },
    mainTitle: {
        paddingLeft:40,
        paddingTop:60,
        paddingBottom:40
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 30,
    },
    subTitle: {    
        paddingBottom:40,
        paddingLeft:40,
        paddingRight:40,

    },
    subText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 13,
        width:350,
        lineHeight: 30,
    },
    footer: {
        alignItems: 'flex-end',
        padding: 30,
        paddingBottom: 30,
        flex:1
    },
    backBtn: {
        paddingLeft:10,
        height: 50,
        width: 100
    },editBox : {
        fontFamily: "NanumMyeongjo",
        fontSize: 20,
    },wordList : {
        flexDirection: "row",
        flexWrap: "wrap"
    }, candidateWord : {
        fontFamily: "NanumMyeongjo",
        fontSize: 15,
    }, badgeStyle:{ 
        borderColor: '#383838', 
        borderWidth:0.5,
        backgroundColor: "#00ff0000",
        padding:12,
        borderRadius:100
    }, badgeText: {
        fontFamily: "NanumMyeongjo",
        backgroundColor: "#00ff0000"
    }
});


export default InputWord;
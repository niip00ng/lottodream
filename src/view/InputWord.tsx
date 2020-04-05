import React from 'react'
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
import WelcomeStartBtn from '../../assets/svg/welcome_start.svg' ;
import GenerateNumberOn from '../../assets/svg/gen_number_on.svg' ;
import GenerateNumberOff from '../../assets/svg/gen_number_off.svg' ;
import BtnX from '../../assets/svg/btn_x.svg' ;
import { TextInput } from 'react-native-gesture-handler';
import {Badge} from 'react-native-elements'
const InputWord = (props:any) => {
    const [value, onChangeText] = React.useState('');
    const [focus, setFocus] = React.useState(false);
    const [word, setWord] = React.useState([]);


    function activateButton () {
        if(focus) return;
        if(word.length < 6) return <GenerateNumberOff/>
        
        return <GenerateNumberOn onPress={() => Alert.alert('Left button pressed')}/>
    }

    function activateTextInput () {
        
        if(word.length === 6) return
        
        return (
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 2}}>    
                <TextInput
                    style={styles.editBox}
                    onFocus={onFocus.bind(true)}
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
                    <Badge value={<Text style={styles.candidateWord}>{candidate}</Text> } badgeStyle={styles.badgeStyle} textStyle={styles.badgeText} onPress={() => {console.log('pressed')}}/>
                </View>
            );
        });
    }

    function addWord () {
        setWord([...word, value]);        
        onChangeText('')
        onFocus()
    }
    function onFocus() {
        setFocus(!focus)
    }

    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.backBtn}>
                    <Back onPress={() => props.navigation.goBack()} />
                    <View style={{paddingTop: 10, paddingLeft: 12}}><Text>단어 입력하기</Text></View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>꿈에서</Text>
                    <Text style={styles.titleText}>무엇을 봤습니까?</Text>
                </View>
                <View style={styles.subTitle}>
                    <View style={styles.wordList}>
                        {wordList()}
                    </View>
                    {activateTextInput()}
                </View>
            </View>
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
        paddingTop:60
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 30,
    },
    subTitle: {    
        padding:40,

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
        paddingBottom: 30
    },
    backBtn: {
        paddingLeft:10,
        height: 50,
        width: 100
    },editBox : {
        fontFamily: "NanumMyeongjo",
        fontSize: 20,
    },wordList : {
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
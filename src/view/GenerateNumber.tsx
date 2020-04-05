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
import LoadStart from '../../assets/svg/load_start.svg' ;
import LoadEnd from '../../assets/svg/load_end.svg' ;
import ShowResultBtn from '../../assets/svg/show_result.svg' ;


const GenerateNumber = (props:any) => {

    const [finish, setFinish] =React.useState(false)

    
    return ( 
        <View style={styles.all}>
            <View style={styles.header}>
                <View style={styles.backBtn}>
                    <Back onPress={() => props.navigation.goBack({key: 'MainPage'})} />
                    <View style={{paddingTop: 10, paddingLeft: 12}}><Text>숫자추출하기</Text></View>
                </View>
            </View>
            <View style={styles.loading}>
                <View>
                    <LoadStart/>
                    <View style={{paddingTop:30, paddingLeft:10}}>
                        <Text>숫자를 추출 중입니다.</Text>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.mainTitle}>
                    <Text style={styles.titleText}>숫자를</Text>
                    <Text style={styles.titleText}>추출하였습니다.</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subText}>아래 결과보기 버튼을 눌러서</Text>
                    <Text style={styles.subText}>행운의 숫자를 확인해보세요.</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <View>
                    <ShowResultBtn onPress={() => props.navigation.push('InputWord')}/>
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
    loading: {
        marginTop:50,
        justifyContent: 'center',
        alignItems: 'center'
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

export default GenerateNumber;
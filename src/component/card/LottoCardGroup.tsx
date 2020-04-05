import React, {useState, useEffect} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Lines from '../../../assets/svg/line.svg' ;


const LottoCardGroup = (props: any) => {

    function NumberList(props:any) {
        const numbers = props.num;
        console.log('숫자리스트 : ' , numbers)
        const listItems = numbers.map((number:any) =>
            <Text>123</Text>
        );
        return (
            <View></View>
        );
      }
    return (
        <View style={styles.all}>
            <View style={styles.header}>
                <Lines/>
                <View style={styles.headerTextBox}>
                    <Text style={styles.dreamName}>{props.name}</Text>
                </View>  
                <View style={styles.dateTextBox}>
                    <Text style={styles.dateText}>{props.date}</Text>
                </View>  
            </View>
        </View>
        
    )
}

const styles=StyleSheet.create({
    all: {
        flex: 1,
        paddingTop: 10,
    },
    header: {
        flex: 1,
        paddingLeft: 20
    },
    headerTextBox: {
        paddingTop: 13,
        paddingLeft: 10
    },
    dateTextBox: {
        paddingTop: 5,
        paddingLeft: 12
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    dreamName: {
        fontSize: 22,
        fontFamily: "NanumMyeongjo",
    },
    dateText: {
        fontSize: 13,
        color: 'gray'
    }
});
export default LottoCardGroup;
import React , {useState, useRef,useEffect }from 'react'
import {
    Platform,
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    Text,
    Alert
} from 'react-native';

import BaseCard from '../../../assets/svg/base_card.svg';
import NumberColor from '../../component/card/NumberColor';

let { width, height } = Dimensions.get('window');

// 해당 화면의 가로와 높이
let w = width
let h = height/2

// 사각형 가로, 대각선길이
let radus = h/4.5
let diagonal = radus * 1.5

// 기준점
let baseLeft = w/2 - radus/1.2;
let baseTop = h/2 - radus/2;

// 간격
let gapWidth = 1.33;
let gapHeight = 2;

const NumberCard = (props : any) => {
    const numbers = [1,20,30,40,41,42,45]
    const recStyle = [{
        left: baseLeft,
        top : baseTop - diagonal/gapHeight * 2
    },
    {
        left: baseLeft - radus/gapWidth,
        top : baseTop - diagonal/gapHeight
    },
    {
        left: baseLeft + radus/gapWidth,
        top : baseTop - diagonal/gapHeight
    },
    {
        left: baseLeft,
        top : baseTop
    },
    {
        left: baseLeft - radus/gapWidth,
        top : baseTop + diagonal/gapHeight
    },
    {
        left: baseLeft + radus/gapWidth,
        top : baseTop + diagonal/gapHeight
    },
    {
        left: baseLeft,
        top : baseTop + diagonal/gapHeight * 2
    }, ]

    function SetCard(props : any) {
        const numbers = props.number;
        console.log(numbers)

        if(numbers === undefined) return;

        return props.number.map((num: any, index:any)  => {
            return (
                 <View style={[styles.rectangle, recStyle[index]]} key={index}>
                     <View style={{right: radus/6}}>
                        <NumberColor num={num}/>
                     </View>
                    <Text style={styles.cardText} onPress={() => {console.log(123123)}}> {num} </Text>
                </View>
            );
        });
    };


    useEffect(() => {
        console.log('NumberCard : ', props.nums)
        console.log('NumberCard : ', props.words)
    }, [])

    return (
        <View style={styles.container}>
            
                <SetCard number={props.nums}/>
            
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
      
      width: w,
      height: h
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      padding: 0
    },
    rectangle : {
        position: 'absolute',
        borderWidth : 1,
        height: radus,
        width: radus,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: "45deg" }]
    },
    //let baseLeft = w/2 - radus/2;
    //let baseTop = diagonal;
    recTop: {
        left: baseLeft + 7.7,
        top: baseTop - diagonal/gapHeight * 2.7,
    }, 
    cardText : {
        fontSize: 24,
        fontFamily: "NanumMyeongjo",
        transform: [{ rotate: "-45deg" }]
    },
  });

  export default NumberCard
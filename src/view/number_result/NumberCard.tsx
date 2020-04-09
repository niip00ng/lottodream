import React , {useState, useRef,useEffect }from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Animated,
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
        
        return props.params.map((param: any, index:any)  => {

            const [front] = useState(new Animated.Value(0))
            const [backend] = useState(new Animated.Value(0))

            function fadeIn() {
                Animated.timing(front, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true
                    }).start();
            }
            function fadeOut() {
                
                Animated.timing(front, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true
                    }).start();
            }
            function fadeInB() {
                Animated.timing(backend, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true
                    }).start();
            }
        
            function fadeOutB() {
                Animated.timing(backend, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true
                    }).start();
            }
            const [clicked, setClicked] = useState(false)

            function call (num:any) {
                if(clicked) {
                    fadeIn()
                    fadeOutB()
                }else {
                    fadeOut()
                    fadeInB()
                }
                setClicked(!clicked)
            }
            useEffect(() => {
                fadeIn()
            }, [])


            function contents () {
                if(clicked) {
                    return (
                        <Animated.View style={{opacity: backend}}>
                            <Text style={[styles.wordText, {color:'#FFFFFF'}]} > {param.word} </Text>
                        </Animated.View>
                    )
                }
                return (
                    <Animated.View style={{opacity: front}}>
                        <Text style={styles.cardText} > {param.number} </Text>
                    </Animated.View>
                )
            }
            const recColor=() => {
                if(!clicked) return {

                }

                return {
                    backgroundColor: '#383838',
                }
            }
            return (
                <TouchableOpacity style={[styles.rectangle, recStyle[index], recColor()]} onPress={() => {call(param.number)}} key={index}>
                        <View style={{right: radus/6}}>
                        <NumberColor num={param.number}/>
                    </View>
                    {contents()}
                </TouchableOpacity>
            );
        });
    };


    useEffect(() => {
        //console.log('NumberCard : ', props.nums)
        //console.log('NumberCard : ', props.words)
        console.log(props.params)
    }, [])


    const sample = [
        {'number': 1, 'word': '개썅마이\n 웨이요'},
        {'number': 10, 'word': '레알마드\n 리드레알'},
        {'number': 20, 'word': 'c'},
        {'number': 30, 'word': 'd'},
        {'number': 40, 'word': 'e'},
        {'number': 45, 'word': 'F'},
        {'number': 41, 'word': 'bonus'},
    ]
    return (
        <View style={styles.container}>
            <BaseCard/>
            {/* <SetCard params={props.params}/> */}
            <SetCard params={sample}/>
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
        transform: [{ rotate: "-45deg" }],
    },
    wordText : {
        fontSize: 14,
        fontFamily: "NanumMyeongjo",
        transform: [{ rotate: "-45deg" }],
        lineHeight: 20
    },
  });

  export default NumberCard
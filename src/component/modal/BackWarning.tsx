import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {Dimensions, View, Animated, Text, StyleSheet, TextInput, Alert} from 'react-native';
import ButtonCancel from '../../../assets/svg/btn_cancel.svg' ;
import ButtonOk from '../../../assets/svg/btn_ok.svg' ;
import Warning from '../../../assets/svg/warning.svg' ;
const clickSafe =require('../../util/click_safe')

// 부모로부터 
const BackWarning = forwardRef((props:any, ref) => {

    const [animation, setAnimation] = useState(new Animated.Value(0))
    const [value, onChangeText] = useState('');
    const [word, setWord] = useState([]);

    //Parents 에서 실행가능한 함수
    // Open
    // Close
    useImperativeHandle(ref, () => ({
        handleOpen
    }));
    
    function handleOpen() {
        Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
    }

    function handleClose(close:boolean) {
        Animated.timing(animation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start(({finished}) => {
                if(close)  props.action()
              });
    }

    const screenHeight = Dimensions.get("window").height;

    const backdrop = {
        transform: [
            {
                translateY: animation.interpolate({
                        inputRange: [0, 0.01],
                        outputRange: [screenHeight, 0],
                        extrapolate: "clamp"
                    })
            }
        ],
        opacity: animation.interpolate({
                inputRange: [0.01, 0.5],
                outputRange: [0, 1],
                extrapolate: "clamp"
            })
    };

    const slideUp = {
        transform: [
            {
                translateY: animation.interpolate({
                        inputRange: [0.01, 1],
                        outputRange: [0, -1 * screenHeight],
                        extrapolate: "clamp"
                    })
            }
        ]
    };

    return (
        <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
            <View style={[styles.sheet]}>
                <Animated.View style={[styles.popup, slideUp]}>
                    <View style={styles.header}>
                        <View style={{paddingTop: 15}}>
                            <Warning/>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={{paddingLeft:40, paddingRight:40}}>
                            <View style={{marginTop: 15, alignItems:'center',justifyContent: "center",}}>    
                                <Text style={styles.titleText}>{props.title}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                            <View>
                                <ButtonCancel onPress={() => {
                                    handleClose(false)
                                }}/>
                            </View>
                            <View>
                                <ButtonOk onPress={() => {
                                    if(clickSafe.safeClicked()) {handleClose(true)
                                }}}/>
                            </View>
                    </View>
                </Animated.View>
            </View>
        </Animated.View>
    );
})


const styles = StyleSheet.create({
    all: {
        flex: 1,
        backgroundColor: "#E5E5E5"
    },
    header: {
        flex: 1,
        paddingTop: 30,
        alignItems:'center',
        justifyContent: "center",
    },
    body: {
        flex: 1,
        paddingTop: 20,
    },
    footer: {
        flexDirection: "row",
        paddingBottom: 30,
        paddingRight: 20,
        justifyContent: "flex-end",
        flex:1
    },
    cover: {
        backgroundColor: "rgba(0,0,0,.3)"
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: 18,
    },
    sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        left: -10,
        right: -10,
        height: "100%",
        justifyContent: "flex-end"
    },
    popup: {
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: "center",
        minHeight: 250
    },

});
export default BackWarning;
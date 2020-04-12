import React, {useState, useEffect, forwardRef, useImperativeHandle, useRef} from 'react';
import {Dimensions, View, Animated, Text, StyleSheet, TextInput} from 'react-native';
import ButtonCancel from '../../../assets/svg/btn_cancel.svg' ;
import ButtonOk from '../../../assets/svg/btn_ok.svg' ;
import BasicWarning from './BasicWarning';
import {verticalScale, horizontalScale, moderateScale} from '../../util/scaling';

// 부모로부터 
const SaveNumbers = forwardRef((props:any, ref) => {
    useEffect(() => {
        //@ts-ignore
        Text.defaultProps = Text.defaultProps || {};     Text.defaultProps.allowFontScaling = false;

        //@ts-ignore
        TextInput.defaultProps = TextInput.defaultProps || {};     TextInput.defaultProps.allowFontScaling = false;
    }, [])
    const [animation, setAnimation] = useState(new Animated.Value(0))
    const [value, onChangeText] = useState('');
    const [word, setWord] = useState([]);
    const modalAlertOpen = useRef();
    const [title, setTitle] = useState('')
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

    function handleClose() {
        
        Animated.timing(animation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start();
    }

    function sendDreamName() {
        if(value === '') {
            setTitle('글자를 입력해주세요.')
            //@ts-ignore
            modalAlertOpen.current.handleOpen();
            return
        }

        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start(({finished}) => {
            props.end(value)
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
                        <View style={{paddingTop: verticalScale(15), paddingLeft: horizontalScale(12)}}>
                            <Text style={styles.titleText} >꿈 이름 정하기</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={{paddingLeft:horizontalScale(40), paddingRight:horizontalScale(40)}}>
                            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1}}>    
                                <TextInput
                                    style={styles.editBox}
                                    editable
                                    maxLength={40}
                                    placeholder='골프공에 귀신들린 꿈'
                                    numberOfLines={1}
                                    onChangeText={(text:string) => onChangeText(text)}
                                    onSubmitEditing={sendDreamName}
                                    value={value} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                            <View>
                                <ButtonCancel onPress={handleClose}/>
                            </View>
                            <View>
                                <ButtonOk onPress={sendDreamName}/>
                            </View>
                    </View>
                </Animated.View>
            </View>
            <BasicWarning title={title} ref= {modalAlertOpen}/>
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
        paddingTop: verticalScale(30),
        paddingLeft: horizontalScale(30),
    },
    body: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        paddingBottom: verticalScale(30),
        justifyContent: "flex-end",
        flex:1
    },
    cover: {
        backgroundColor: "rgba(0,0,0,.3)"
    },
    editBox : {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(18),
    },
    titleText: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(20),
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
        marginHorizontal: horizontalScale(10),
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: "center",
        minHeight: verticalScale(250)
    },

});
export default SaveNumbers;
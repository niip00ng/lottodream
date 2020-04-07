import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {Dimensions, View, Animated, Text, StyleSheet, TouchableOpacity} from 'react-native';

// 부모로부터 
const SaveNumbers = forwardRef((props, ref) => {

    const [animation, setAnimation] = useState(new Animated.Value(0))
    

    //Parents 에서 실행가능한 함수
    // Open
    // Close
    useImperativeHandle(ref, () => ({
        handleOpen
    }));
    
    function handleOpen() {
        console.log(12313)
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
            })
            .start();
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
                    <TouchableOpacity onPress={handleClose}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <Text>ddd</Text>
                </Animated.View>
            </View>
        </Animated.View>
    );
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    cover: {
        backgroundColor: "rgba(0,0,0,.3)"
    },
    sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        left: 0,
        right: 0,
        height: "100%",
        justifyContent: "flex-end"
    },
    popup: {
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50
    }
});
export default SaveNumbers;
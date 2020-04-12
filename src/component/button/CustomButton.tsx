import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
const clickSafe =require('../../util/click_safe')
import NextSvg from '../../../assets/svg/next.svg'
import NextOffSvg from '../../../assets/svg/next_off.svg'
import {verticalScale, horizontalScale, moderateScale} from '../../util/scaling';
const { width, height } = Dimensions.get('window');

const CustomButton = (props: any) => {

    function action () {
        return props.action()
    }

    function nextSvg () {

        if(!props.active) return <NextOffSvg/>

        else return <NextSvg/>
    }
    
    function borderColor() {
        console.log('borderColor', props.active)
        if (!props.active) {
            return {'borderColor': '#bababa'}
        }else {
            return {'borderColor': '#383838'}
        }
        
    }

    function textColor() {
        console.log('text', props.active)
        if (!props.active) {
            return {'color': '#bababa'}
        }else {
            return {'color': '#383838'}
        }
        
    }
    return (
        <TouchableOpacity activeOpacity={1} style={[styles.button, borderColor()]} onPress = {() => {
            if(clickSafe.safeClicked()) {action()}
        }}>
            <View style={{flex:3, marginLeft: 30}}>
                <Text style={[ styles.title , textColor()]} >{props.title}</Text>
            </View>
            <View style={{flex:1, alignItems: 'flex-end', marginRight: 20}}>
                {nextSvg()}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "NanumMyeongjo",
        fontSize: moderateScale(16)
    },
    button: {
        width: horizontalScale(219),
        height: verticalScale(55),
        borderWidth: 1,
        backgroundColor: '#00ff0000',
        alignItems: 'center',
        flexDirection: 'row',
        opacity: 1
    }
  });


  export default CustomButton;
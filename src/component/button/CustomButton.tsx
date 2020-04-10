import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
const clickSafe =require('../../util/click_safe')
import NextSvg from '../../../assets/svg/next.svg'
const CustomButton = (props: any) => {

    const [buttonStyle, setButtomStyle] = useState({
        borderColor:'#383838',
      })
      const [textColor, setTextColor] = useState({
        color:'#383838',
      })
    function action () {
        return props.action()
    }

    
    useEffect(() => {
        console.log(props.active)
        if(props.active === undefined) return
            
    
        if(!props.active) {
            setButtomStyle({
                borderColor:'#C3BDBA',
            })
            setTextColor({
                color:'#C3BDBA',
            })
        }
    }, [])
    return (
        <TouchableOpacity activeOpacity={1} style={[styles.button, buttonStyle]} onPress = {() => {
            if(clickSafe.safeClicked()) {action()}
        }}>
            <View style={{flex:3, marginLeft: 30}}>
                <Text style={[ styles.title , textColor]} >{props.title}</Text>
            </View>
            <View style={{flex:1, alignItems: 'flex-end', marginRight: 30}}>
                <NextSvg/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "NanumMyeongjo",
        fontSize: 16
    },
    button: {
        width: 219,
        height: 55,
        borderWidth: 1,
        backgroundColor: '#00ff0000',
        alignItems: 'center',
        flexDirection: 'row',
        opacity: 1
    }
  });


  export default CustomButton;
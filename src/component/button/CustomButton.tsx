import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
const clickSafe =require('../../util/click_safe')
import NextSvg from '../../../assets/svg/next.svg'
const CustomButton = (props: any) => {

    function action () {
        return props.action()
    }
    
    return (
        <TouchableOpacity activeOpacity={1} style={styles.button} onPress = {() => {
            if(clickSafe.safeClicked()) {action()}
        }}>
            <View style={{flex:3, marginLeft: 30}}>
                <Text style={styles.title} >{props.title}</Text>
            </View>
            <View style={{flex:1, alignItems: 'flex-end', marginRight: 30}}>
                <NextSvg/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      width: 219,
      height: 55,
      borderWidth: 1,
      borderColor:'#383838',
      backgroundColor: '#00ff0000',
      alignItems: 'center',
      flexDirection: 'row',
      opacity: 1
    },
    title: {
        fontFamily: "NanumMyeongjo",
        fontSize: 16
    },
  });


  export default CustomButton;
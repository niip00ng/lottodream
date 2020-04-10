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
    useEffect(() => {
        
        
    }, [])
    function action () {
        return props.action()
    }
    return (
        <TouchableOpacity activeOpacity={1} style={styles.button} onPress = {() => {
            if(clickSafe.safeClicked()) {action()}
        }}>
            <Text style={styles.title} >{props.title}</Text>
            <View style={{paddingLeft: 50}}>
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
      backgroundColor: '#00ff0000',
      alignItems: 'center',
      flexDirection: 'row',
      opacity: 1
    },
    title: {
      fontSize: 15,
      marginLeft: 30
    },
  });


  export default CustomButton;
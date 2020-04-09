import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    StatusBar,
    Alert
} from 'react-native';


const DiamondCard = () => {
    
    return (
        <View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
      position: 'relative',
    },
    rectangle: {
      height: 128,
      width: 128,
      backgroundColor: 'salmon',
      position: 'absolute', 
      zIndex: 99,
      top: '50%',
      left: '40%'
    },
  
  });
export default DiamondCard;
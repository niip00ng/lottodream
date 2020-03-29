import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';

const CustomButton = (props: any) => {
    return (
        <TouchableOpacity
            style={[
                styles.button, {
                    backgroundColor: props.buttonColor
                }
            ]}
            onPress={props.onPress}>
            <Text
                style={[
                    styles.title, {
                        color: props.titleColor,
                        fontSize: 15,
                    }
                ]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
      borderRadius: 5,
    },
    title: {
      fontSize: 15,
    },
  });


  export default CustomButton;
import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modalbox';

const SaveNumbers = (props:any) => {
    return (
        <View>
            <Modal isOpen={true} useNativeDriver={true} style={styles.modal} position={"bottom"}>
                <Text style={styles.text}>Modal on bottom with backdrop</Text>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({

    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
    },

    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

});
export default SaveNumbers;
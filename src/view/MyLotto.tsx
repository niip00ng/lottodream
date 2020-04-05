import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native';
import CustomButton from '../component/button/CustomButton';
import LottoCardGroup from '../component/card/LottoCardGroup'
const MyLotto = (navigation:any) => {

    const state = {
        names: [
            {
                'name': 'Ben',
                'id': 1
            }, {
                'name': 'Susan',
                'id': 2
            }, {
                'name': 'Robert',
                'id': 3
            }, {
                'name': 'Mary',
                'id': 4
            }, {
                'name': 'Daniel',
                'id': 5
            }, {
                'name': 'Laura',
                'id': 6
            }, {
                'name': 'John',
                'id': 7
            }, {
                'name': 'Debra',
                'id': 8
            }, {
                'name': 'Aron',
                'id': 9
            }, {
                'name': 'Ann',
                'id': 10
            }, {
                'name': 'Steve',
                'id': 11
            }, {
                'name': 'Olivia',
                'id': 12
            }
        ]
    }

    return (
        <View style={styles.all}>
            <View style={styles.body}>
                <View style={styles.bodyTitle}>
                    <Text style={styles.titleText}>보관함</Text>
                    <Text
                        style={{
                            fontSize: 20
                        }}>
                        3 / 3
                    </Text>
                    <View
                        style={{
                            paddingTop: 15
                        }}>
                        <TouchableOpacity style={styles.button}>
                            <Text
                                style={[
                                    styles.title, {
                                        color: 'white',
                                        fontSize: 13
                                    }
                                ]}>+보관함 늘리기</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.bodyContents}>
                    <ScrollView>
                        {
                            state
                                .names
                                .map((item, index) => (
                                    <View key={item.id} style={styles.item}>
                                        <Text>{item.name}</Text>
                                    </View>
                                ))
                        }
                    </ScrollView>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    all: {
        flex: 1
    },
    settingButton: {
        height: 50,
        width: 50
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    bodyTitle: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 50
    },
    bodyContents: {
        flex: 7,
        padding: 20,
        paddingBottom: 50
    },
    button: {
        width: 120,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'gray',
        justifyContent: 'center',
        borderRadius: 10
    },
    title: {
        fontSize: 15
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});

export default MyLotto;
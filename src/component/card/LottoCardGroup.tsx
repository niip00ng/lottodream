import React, {useState, useEffect} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Lines from '../../../assets/svg/line.svg' ;
import Dot01 from '../../../assets/svg/dot01.svg' ;
import Dot20 from '../../../assets/svg/dot20.svg' ;
import Dot30 from '../../../assets/svg/dot30.svg' ;
import Dot40 from '../../../assets/svg/dot40.svg' ;


const LottoCardGroup = (props: any) => {

    const [numList, setNumList] = useState([]);
    
    
    useEffect(() => {
        console.log('초기화 중 ...');
        console.log('numbers : ', props.numbers)
        setNumList(props.numbers)
    }, [])

    function NumberList(props : any) {
        const numbers = props.num;
        console.log('숫자리스트 : ', numbers)
        
        if(numbers === undefined) return ;
        return numbers.map((element:number) => {
            return (
                <View style={styles.numberSet}>
                    {NumberColor(element)}
                    <Text style={styles.lottoNumber}>{element}</Text>
                </View>
            );
        });
    };
    function NumberColor(num:number) {

        if(num < 11) return <Dot01/>;
        else if(num <21) return <Dot01/>;
        else if(num <31) return <Dot20/>;
        else if(num <41) return <Dot30/>;
        else return <Dot40/>;
    };

    function LottoStatus(status:number, round:number) {
        if(status !== 0) return <Text style={styles.successMessege}>{round}회차 {status}등 당첨!</Text>;
    };

    return (
        <View style={styles.all} key={props.key}>
            <View style={styles.header}>
                <Lines/>
                <View style={styles.headerTextBox}>
                    <Text style={styles.dreamName}>{props.name}</Text>
                    <View style={{paddingLeft: 10}}>{LottoStatus(props.status, props.round)}</View>
                    
                </View>  
                <View style={styles.dateTextBox}>
                    <Text style={styles.dateText}>{props.date}</Text>
                </View> 
            </View>
            <View style={styles.body}>
                <NumberList num={numList}></NumberList>
            </View>
        </View>
        
    )
}

const styles=StyleSheet.create({
    all: {
        flex: 1,
        paddingTop: 10,
    },
    header: {
        flex: 1,
        paddingLeft: 20
    },
    headerTextBox: {
        flexDirection: "row",
        paddingTop: 13,
        paddingLeft: 10
    },
    dateTextBox: {
        paddingTop: 5,
        paddingLeft: 12
    },
    body: {
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        flex: 1
    },
    dreamName: {
        fontSize: 22,
        fontFamily: "NanumMyeongjo",
    },
    dateText: {
        fontSize: 13,
        color: 'gray'
    },
    lottoNumber :{
        fontSize: 20,
        color: 'gray'
    },numberSet: {
        alignItems: 'center',
        marginTop:30
    }, successMessege : {
        
        fontSize: 22,
        fontFamily: "NanumMyeongjo",
        color: '#D92A2A'
    }
});
export default LottoCardGroup;
import React, {useEffect, useState} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Recommend = (props :any) => {
    const [selected, setSelected] = useState('');
    const dreamWord = useState(require('../../../assets/meta/dream.json'));

    const selectWord = React.useCallback(id => {
        console.log('추천 선택 : ', id)

        props.add(id)
    }, [selected],);


    // 추천단어 추리기
    function makeRecommand() {
        
    }
    return (
        <View style={styles.all}>
            <FlatList
                data={[
                    {key: '사과'},
                    {key: '사과나무'},
                    {key: '사과즙'},
                    {key: '사과주스'},
                    {key: '사과박스'},
                ]}
                renderItem={({item}) => 
                    <Text 
                        style={styles.item} 
                        onPress={() => selectWord(item.key)}>
                        {item.key}
                    </Text>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    all: {
     paddingTop: 10
    },
    item: {
      padding: 0,
      fontSize: 16,
      height: 35,
      color: '#383838'
    },
  })

  
export default Recommend;
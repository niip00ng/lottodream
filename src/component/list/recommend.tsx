import React, {useEffect, useState} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Recommend = (props :any) => {
    const [selected, setSelected] = useState('');
    
    const selectWord = React.useCallback(id => {
        console.log('추천 선택 : ', id)

        props.add(id)
    }, [selected],);

    return (
        <View style={styles.all}>
            <FlatList
                data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
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
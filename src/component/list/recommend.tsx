import React, {useEffect, useState} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Recommend = (props :any) => {
    const [selected, setSelected] = useState('');
    const [recommandData, setRecommandData] = useState();
    const genLib = require('../../util/RecommandLib')

    const selectWord = React.useCallback(id => {
        props.add(id)
    }, [selected],);

    function searchRecommnand (val:string) {
        
        const recomand = genLib.searchWord(val);
        
        return recomand;
    }
    return (
        <View style={styles.all}>
            <FlatList
                keyExtractor={item => item.toString()}
                data={searchRecommnand(props.value)}
                renderItem={({item}) => 
                    <Text 
                        style={styles.item} 
                        onPress={() => selectWord(item)}>
                        {item}
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
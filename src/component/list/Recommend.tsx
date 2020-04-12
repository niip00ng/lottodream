import React, {useEffect, useState} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {verticalScale, horizontalScale, moderateScale} from '../../util/scaling';

const Recommend = (props :any) => {
    const [selected, setSelected] = useState('');
    const [recommandData, setRecommandData] = useState();
    const genLib = require('../../util/recommandLib')
    
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
     paddingTop: verticalScale(10)
    },
    item: {
      fontSize: moderateScale(16),
      height: verticalScale(35),
      color: '#383838'
    },
  })

  
export default Recommend;
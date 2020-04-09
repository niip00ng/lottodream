import React from 'react';
import {View} from 'react-native';

import Dot01 from '../../../assets/svg/dot01.svg' ;
import Dot10 from '../../../assets/svg/dot10.svg' ;
import Dot20 from '../../../assets/svg/dot20.svg' ;
import Dot30 from '../../../assets/svg/dot30.svg' ;
import Dot40 from '../../../assets/svg/dot40.svg' ;

const NumberColor = (props : any) => {

    function defineColor() {
        if(props.num < 10) return <Dot01/>;
        else if(props.num <20) return <Dot10/>;
        else if(props.num <30) return <Dot20/>;
        else if(props.num <40) return <Dot30/>;
        else return <Dot40/>;
    }

    return (
        <View>
            {defineColor()}
        </View>
    )
}

export default NumberColor;
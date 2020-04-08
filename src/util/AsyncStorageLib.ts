import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('::: AsyncStorage set ERROR !! ')
        return false
    }

    return true
};

export const retrieveData = async (key : string) => {
    try {
        let value = await AsyncStorage.getItem(key);
        if (value === null) return null; 
        console.log('retrieveData 내부값 : ', value);
        return value
    } catch (error) {
        console.log('::: AsyncStorage get ERROR !! ')
        return null; 
    }
};
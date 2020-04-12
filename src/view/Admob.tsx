import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7024707494100333/8967630979';

const Admob = () => {
  const [loaded, setLoaded] = useState(false);
  
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });


  useEffect(() => {
    console.log('adunit id : ', adUnitId)
    console.log('adunit id : ', interstitial)
    
    const eventListener = interstitial.onAdEvent(type => {

      console.log('type : ', type)
      if (type === AdEventType.LOADED) {
        interstitial.show();
        //setLoaded(true);
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      console.log('eventListener')
      eventListener();
    };
  }, []);

  
  if (!loaded) {
    console.log('No advert ready to show yet')
    return null;
  }

  return (
    <Button
      title="Show Interstitial"
      onPress={() => {
        //showAd();
        
      }}
    />
  );
}

export default Admob;
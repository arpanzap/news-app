import React from 'react';
import {
   ActivityIndicator,
   StyleSheet, View
} from 'react-native';

const LoadingScreen = () => {
   return (
      <View style={styles.mainContainer}>
         <View style={styles.innerContainer} />
         <ActivityIndicator
            color={'black'}
            size="large"
         />
      </View>
   );
};

export const styles = StyleSheet.create({
   mainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
   },
   innerContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'black',
      opacity: 0.3,
   }
});

export default LoadingScreen;

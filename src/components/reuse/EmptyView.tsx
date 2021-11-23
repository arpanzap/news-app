import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Config from '../../utils/Config';



interface Props {
  message?: String;
  style?: Object;
}


export const EmptyView = ({ message, style }: Props) => {
  return (
    <View
      pointerEvents="none"
      style={[styles.container,
        style,
      ]}>
      <Text
        style={styles.text}>
        {message}
      </Text>
    </View>

  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },

  text: {
    fontSize: moderateScale(14),
    justifyContent: 'center',
    textAlign: 'center',

  }
})

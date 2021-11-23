import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';



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
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent"
  },

  text: {
    fontSize: moderateScale(14),
    justifyContent: 'center',
    textAlign: 'center',
  }
})

import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
} from 'react-native'
import { moderateScale } from 'react-native-size-matters';
/**
 *
 * @returns CategoryButtonComp
 */

interface Props {
    title: string,
    containerStyle?: ViewStyle | any;
    innerStyle?: ViewStyle;
    textStyle?: TextStyle;
    onPress?: () => void;
}
const CategoryButtonComp = ({
    title,
    containerStyle,
    textStyle,
    onPress,
}: Props) => {

    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.main_container, containerStyle]}>
            <Text style={[styles.text_style, textStyle]}>{title}</Text>
        </TouchableOpacity>

    )
}
export default CategoryButtonComp
const styles = StyleSheet.create({
    main_container: {
        width: "32%",
        alignItems: "center",
        paddingVertical: moderateScale(10),
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(4),
        backgroundColor: "#a0c1b0",
        borderRadius: moderateScale(14)
    },
    text_style: {
        color: "black"
    }
})

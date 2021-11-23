import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import { ICategory } from '../../models/types';
/**
 *
 * @returns CategoryButtonComp
 */

interface Props {
    item: ICategory,
    onPress?: () => void
}

const CategoryButtonComp = ({
    item,
    onPress
}: Props) => {

    const style = {
        ...styles.main_container,
        backgroundColor: item.isSelected ? 'lightblue' : "#a0c1b0",
    }

    return (
        <TouchableOpacity onPress={onPress}
            style={style}>
            <Text style={styles.text_style}>{item.name}</Text>
        </TouchableOpacity>

    )
}
export default CategoryButtonComp

const styles = StyleSheet.create({
    main_container: {
        padding: moderateScale(10),
        margin: moderateScale(2),
        alignItems: "center",
        borderRadius: moderateScale(15),
    },
    text_style: {
        color: "black",
        fontSize: moderateScale(14)
    }
})

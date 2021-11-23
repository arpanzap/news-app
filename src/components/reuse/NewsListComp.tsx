import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions, Image
} from 'react-native'
import { moderateScale } from 'react-native-size-matters';
/**
 *
 * @returns NewsList Comp
 */

interface item {
    title: string,
    publishedAt: string,
    description: string,
    urlToImage: string
}

interface Props {
    item: item,
    onPress?: () => void;
}
const NewsListComp = ({
    item,
    onPress
}: Props) => {

    return (
        <TouchableOpacity onPress={onPress}
            style={styles.containerCard}>
            <Text adjustsFontSizeToFit={true} style={{ ...styles.text, fontWeight: "bold" }}>{item.title}
            </Text>
            <Text adjustsFontSizeToFit={true} style={{ ...styles.text, color: "grey", }}>{item.publishedAt}
            </Text>
            <Image source={{ uri: item.urlToImage }} style={styles.img_style}></Image>
            <Text adjustsFontSizeToFit={true} style={{ ...styles.text }}>{item.description}
            </Text>
        </TouchableOpacity>

    )
}
export default NewsListComp
const styles = StyleSheet.create({
    containerCard: {
        width: Dimensions.get('window').width - 65,
        borderRadius: moderateScale(14),
        borderColor: "grey",
        borderWidth: StyleSheet.hairlineWidth,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.9,
        elevation: 2,
        marginVertical: moderateScale(18),
        padding: moderateScale(10),
        backgroundColor: "white",
        alignItems: "center"

    },
    text: {
        padding: moderateScale(5),
        color: "black"
    },
    img_style: {
        aspectRatio: 1.7,
        width: "95%",
        borderRadius: moderateScale(10),
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: moderateScale(10)
    }
})


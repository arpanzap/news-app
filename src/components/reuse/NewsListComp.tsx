import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import { IArticle } from '../../models/types';
import ImageLoad from 'react-native-image-placeholder';

/**
 *
 * @returns NewsList Comp
 */
interface Props {
    item: IArticle,
    onPress?: () => void;
}
const NewsListComp = ({
    item,
    onPress
}: Props) => {

    return (
        <TouchableOpacity onPress={onPress}
            style={styles.containerCard}>
            <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{
                    ...styles.text,
                    fontWeight: "700"
                }}>{item.title}
            </Text>
            <Text adjustsFontSizeToFit={true} style={{
                ...styles.text,
                color: "grey",
            }}>{new Date(item.publishedAt).toDateString()}
            </Text>
            <ImageLoad
                resizeMode={"stretch"}
                style={styles.img_style}
                source={{ uri: item.urlToImage }}
            >
            </ImageLoad>
            <Text
                numberOfLines={4}
                ellipsizeMode={'tail'}
                style={{ ...styles.text }}>{item.description}
            </Text>
        </TouchableOpacity>

    )
}
export default NewsListComp
const styles = StyleSheet.create({
    containerCard: {
        borderRadius: moderateScale(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.9,
        elevation: 2,
        marginVertical: moderateScale(10),
        padding: moderateScale(5),
        backgroundColor: "white",
        alignItems: "center"
    },
    text: {
        padding: moderateScale(5),
        color: "black",
        fontSize: moderateScale(15)
    },
    img_style: {
        aspectRatio: 1.7,
        width: "95%",
        borderRadius: moderateScale(10),
        overflow: "hidden",
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: moderateScale(10)
    }
})


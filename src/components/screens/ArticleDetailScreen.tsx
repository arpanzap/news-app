import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { HomeParamList } from '../../models/navigation-params';
import ImageLoad from 'react-native-image-placeholder';
import Config from '../../utils/Config';
import { Log } from '../../utils/Logger';

const ArticleDetailScreen = () => {
  type NavigationProp = StackNavigationProp<HomeParamList, 'NewsFeedScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<RouteProp<HomeParamList, 'ArticleDetailScreen'>>();

  const {
    author,
    content,
    description,
    publishedAt,
    title,
    urlToImage
  } = route.params.item

  const onBackPress = () => {
    navigation.goBack();
  };

  Log(description, 'description')
  Log(content, 'content')

  return (
    <View style={styles.main_container}>
      <View style={styles.header_container}>
        <TouchableOpacity onPress={onBackPress}>
          <Image
            source={require('../../assets/ic_back.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inner_container}>
        <Text
          style={{
            ...styles.text_title,
            fontWeight: "700"
          }}>{title}
        </Text>
        <ScrollView contentContainerStyle={{
          alignItems: 'center',
          flex: 1,
        }}>
          <Text style={{ ...styles.text_title, color: 'gray' }}>
            {new Date(publishedAt).toDateString()}
          </Text>
          <Text style={styles.author_text}>{author}</Text>
          <ImageLoad
            resizeMode={"stretch"}
            style={styles.img_style}
            source={{ uri: urlToImage }}
          />
          <Text style={styles.description_text}>
            {description}
          </Text>
          <Text style={styles.description_text}>{content}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default ArticleDetailScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Config.colors.blue,
  },
  header_container: {
    width: '100%',
    height: 50,
  },
  inner_container: {
    flex: 1,
    backgroundColor: Config.colors.green,
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
    padding: moderateScale(10),
    alignItems: 'center',
    borderRadius: moderateScale(14),
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.9,
    elevation: 2,
  },
  text_title: {
    padding: moderateScale(5),
    color: 'black',
    textAlign: 'center',
  },
  text_publish_date: {
    padding: moderateScale(5),
    color: 'gray',
    textAlign: 'center',
  },
  img_style: {
    aspectRatio: 1.7,
    width: '95%',
    overflow: 'hidden',
    borderRadius: moderateScale(10),
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: moderateScale(10),
  },
  description_text: {
    color: 'black',
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  author_text: {
    textAlign: 'center',
    color: 'black',
  },
});

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import {HomeParamList} from '../../models/navigation-params';

const ArticleDetailScreen = () => {
  type NavigationProp = StackNavigationProp<HomeParamList, 'NewsFeedScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<HomeParamList, 'ArticleDetailScreen'>>();

  const OnbackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.header_container}>
        <TouchableOpacity onPress={OnbackPress}>
          <Image
            source={require('/Users/zapbuild/Downloads/Assignment/src/assets/backArrow.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inner_container}>
        <ScrollView>
          <Text style={styles.text_title}>{route.params.title}</Text>
          <Text style={{...styles.text_title, color: 'gray'}}>
            {route.params.publishedAt}
          </Text>
          <Text style={styles.author_text}>{route.params.author}</Text>
          <Image
            source={{uri: route.params.urlToImage}}
            style={styles.img_style}></Image>
          <Text adjustsFontSizeToFit={true} style={styles.description_text}>
            {route.params.description}
          </Text>
          <Text style={styles.content_text}>{route.params.content}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default ArticleDetailScreen;
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#bfdcef',
  },
  header_container: {
    width: '100%',
    height: 50,
  },
  inner_container: {
    flex: 0.95,
    backgroundColor: 'white',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),

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
    borderRadius: moderateScale(10),
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: moderateScale(10),
  },
  description_text: {
    padding: moderateScale(5),
    color: 'black',
  },
  content_text: {
    padding: moderateScale(10),
    color: 'black',
  },
  author_text: {
    textAlign: 'center',
    color: 'black',
  },
});

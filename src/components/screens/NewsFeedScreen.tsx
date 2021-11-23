import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamList } from '../../models/navigation-params';
import { moderateScale } from 'react-native-size-matters';
import DelayInput from "react-native-debounce-input";
import CategoryButtonComp from '../reuse/CategoryButtonComp';
import { EmptyView } from '../reuse/EmptyView';
import { IArticle, ICategory } from '../../models/types';
import { categoriesData } from '../../utils/common';
import Config from '../../utils/Config';
import { executeGetRequest } from '../../utils/fetchUtils';
import { Log } from '../../utils/Logger';
import NewsListComp from '../reuse/NewsListComp';
import LoadingScreen from '../reuse/LoadingScreen';
/**
 *
 * @returns NewsFeed Screen
 */

const NewsFeedScreen = () => {

  type NavigationProp = StackNavigationProp<HomeParamList, 'NewsFeedScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const [searchText, setSearchText] = useState<any>('');
  const [articlesList, setArticleList] = useState<IArticle[]>([]);
  const [categories, setCategories] = useState<ICategory[]>(categoriesData)
  const [loading, setLoading] = useState(true)


  let flatListRef = useRef<FlatList<IArticle> | null>()
  let page = useRef<number>(1)
  let canLoadMore = useRef<boolean>(true)

  const onCategoryPress = (selectedIndex: number) => {
    setCategories(categories.map((item, index) => { return { ...item, isSelected: index === selectedIndex } }))
  }

  const onItemClick = (item: IArticle) => {
    navigation.navigate('ArticleDetailScreen', { item });
  };

  /**
   * get list form API set to state
   */
  const getNewsListFromApi = async (q?: string) => {
    const selectedCategory = categories.filter(item => item.isSelected)
    let requestUrl = `top-headlines?page=${page.current}&country=us&category=${selectedCategory[0].name.toLowerCase()}&apiKey=${Config.server.api_key}`
    if (q)
      requestUrl += `&q=${q}`
    try {
      setLoading(true)
      const response = await executeGetRequest(requestUrl)
      setLoading(false)
      const articles = response.response.articles
      setArticleList(page.current == 1 ? articles : [...articlesList, ...articles])
      flatListRef.current?.scrollToIndex({ index: 0, animated: true })
    } catch (error) {
      Log(error, "error")
    }
  };

  useEffect(() => {
    getNewsListFromApi();
  }, [categories]);

  useEffect(() => {
    page.current = 1
    getNewsListFromApi(searchText);
  }, [searchText]);

  return (
    <View style={styles.main_container}>
      <Text style={styles.heading_style}>News Feed</Text>
      <DelayInput
        style={styles.text_input_style}
        minLength={3}
        placeholder="Search here..."
        placeholderTextColor="black"
        value={searchText}
        delayTimeout={200}
        onChangeText={setSearchText} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {categories.map((item, index) => {
          return <CategoryButtonComp
            onPress={() => onCategoryPress(index)}
            key={item.name}
            item={item}
          />
        })}
      </View>
      <FlatList
        ref={flatListRef}
        data={articlesList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <NewsListComp onPress={() => onItemClick(item)} item={item} />
          );
        }}
      />
      {loading && <LoadingScreen />}
      {articlesList?.length == 0 && <EmptyView message={'Data Not Found'} />}
    </View>
  );
};
export default NewsFeedScreen;
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#bfdcef',
    paddingHorizontal: moderateScale(30),

  },
  text_input_style: {
    borderRadius: moderateScale(5),
    borderWidth: 1,
    borderColor: '#caa9a9',
    padding: moderateScale(10),
    backgroundColor: '#caa9a9',
    marginBottom: moderateScale(10),
  },
  heading_style: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: moderateScale(20),
  },
  common_view: {
    flexDirection: 'row',
  },
});

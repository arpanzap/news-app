import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator
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
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [loadingNext, setLoadingNext] = useState(false)

  let flatListRef = useRef<FlatList<IArticle> | null>()
  let page = useRef<number>(1)
  let canLoadMore = useRef<boolean>(true)

  const onCategoryPress = (selectedIndex: number) => {
    setCategories(categories.map((item, index) => { return { ...item, isSelected: index === selectedIndex } }))
  }

  const onItemClick = (item: IArticle) => {
    navigation.navigate('ArticleDetailScreen', { item });
  };

  function onEndReached() {
    if (canLoadMore) {
      setLoadingNext(true)
      page.current = page.current + 1
      getNewsListFromApi()
    }
  }

  /**
   * get list form API set to state
   */
  const getNewsListFromApi = async (q?: string) => {
    const selectedCategory = categories.filter(item => item.isSelected)
    let requestUrl = `top-headlines?page=${page.current}&country=us&category=${selectedCategory[0].name.toLowerCase()}&apiKey=${Config.server.api_key}`
    if (q)
      requestUrl += `&q=${q}`
    try {
      const response = await executeGetRequest(requestUrl)
      const updatedArticles = page.current == 1 ? response.response.articles : [...articlesList, ...response.response.articles]
      canLoadMore.current == updatedArticles.length < response.response.totalResults
      setArticleList(updatedArticles)
      setLoading(false)
      setLoadingNext(false)
      if (page.current == 1)
        flatListRef.current?.scrollToIndex({ index: 0, animated: true })
    } catch (error) {
      setLoading(false)
      setLoadingNext(false)
      Log(error, "error")
    }
  };

  useEffect(() => {
    page.current = 1
    setSearchText('')
    setLoading(true)
    getNewsListFromApi();
  }, [categories]);

  useEffect(() => {
    page.current = 1
    getNewsListFromApi(searchText);
  }, [searchText]);

  return (
    <SafeAreaView style={styles.main_container}>
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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
        renderItem={({ item, index }) => {
          return (
            <NewsListComp onPress={() => onItemClick(item)} item={item} />
          );
        }}
      />
      {loadingNext ? <ActivityIndicator color={'black'} /> : null}
      {loading && <LoadingScreen />}
      {articlesList?.length == 0 && <EmptyView message={'Data Not Found'} />}
    </SafeAreaView>
  );
};
export default NewsFeedScreen;
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#bfdcef',
    paddingHorizontal: moderateScale(20),

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
    fontSize: moderateScale(22),
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: moderateScale(20),
  },
  common_view: {
    flexDirection: 'row',
  },
});

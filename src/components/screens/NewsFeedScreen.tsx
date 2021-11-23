import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamList } from '../../models/navigation-params';
import { moderateScale } from 'react-native-size-matters';
import CategoryButtonComp from '../reuse/CategoryButtonComp';
import Config from '../../utils/Config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { EmptyView } from '../reuse/EmptyView';
import NewsListComp from '../reuse/NewsListComp';
/**
 *
 * @returns NewsFeed Screen
 */

const NewsFeedScreen = () => {
  type NavigationProp = StackNavigationProp<HomeParamList, 'NewsFeedScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [newsList, setnewsList] = useState([]);
  const dispatch = useDispatch();

  const loadingStatus = useSelector(
    (state: RootState) => state.loadingReducer.loadingStatus,
  );
  // const dataList = useSelector((state: RootState) => state.persistedReducer.List);

  // Set Input Field Values
  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const onItemClick = (item: any) => {
    navigation.navigate('ArticleDetailScreen', item);
  };

  /**
   * get list form API set to state
   */
  const onNewsList = async () => {
    // const res: any = await dispatch(getList())
    // if (res.code == 200) {
    //     setnewsList(res.data)

    // }
    let response = await fetch(
      'https://newsapi.org/v2/everything?q=tesla&from=today&sortBy=publishedAt&apiKey=2a88da57240541808060b7ea64f79dc7',
    );

    let json = await response.json();

    setnewsList(json.articles);
    return json;
  };

  useEffect(() => {
    onNewsList();
  }, []);
  return (
    <View style={styles.main_container}>
      <View style={{ flex: 0.9 }}>
        <Text style={styles.heading_style}>News Feed</Text>
        <TextInput
          style={styles.text_input_style}
          placeholder="Search here..."
          placeholderTextColor="black"
          value={searchText}
          onChangeText={onChangeText}></TextInput>

        <View style={styles.common_view}>
          <CategoryButtonComp title={Config.Strings.entertainment} />
          <CategoryButtonComp title={Config.Strings.general} />
          <CategoryButtonComp title={Config.Strings.business} />
        </View>

        <View style={styles.common_view}>
          <CategoryButtonComp title={Config.Strings.health} />
          <CategoryButtonComp title={Config.Strings.sport} />
          <CategoryButtonComp title={Config.Strings.science} />
        </View>
        <CategoryButtonComp title={Config.Strings.technology} />

        <FlatList
          data={newsList}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <NewsListComp onPress={() => onItemClick(item)} item={item} />
            );
          }}
        />
      </View>
      {newsList?.length == 0 && <EmptyView message={'no data'} />}
    </View>
  );
};
export default NewsFeedScreen;
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#bfdcef',
    paddingHorizontal: moderateScale(30),
    justifyContent: 'center',
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

import { IArticle } from "./types";

// Add Params types for every component
export type HomeParamList = {
  NewsFeedScreen: undefined;
  ArticleDetailScreen: {
    item: IArticle
  };
};

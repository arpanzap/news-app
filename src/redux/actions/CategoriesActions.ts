import { Dispatch } from "redux";
import { AppActionTypes } from "./ActionTypes";
import { setLoading } from "../creators/LoadingCreator";
import { executeGetRequest } from "../../utils/fetchUtils"
import { RootState } from '..'
import { setList } from "../creators/CategoriesCreators"
import Config from "../../utils/Config";
import { IArticle } from "../../models/types";

// export interface ResponseType {
//     status: string;
//     totalResults: number;
//     articles: IArticle[];
// }

// export const getNewsList = (category: string, query?: string) => {
//     return async (dispatch: Dispatch<AppActionTypes>, getState: () => RootState) => {
//         try {
//             dispatch(setLoading(true));
//             let requestUrl = `top-headlines?category=${category}&apiKey=${Config.server.api_key}`
//             if (query)
//                 requestUrl += `&q=${query}`
//             const apiResponse = await executeGetRequest(requestUrl)

//             dispatch(setLoading(false));
//             if (apiResponse.code != 200) {
//                 throw apiResponse.error;
//             }
//             dispatch(setList(apiResponse.data))
//             return apiResponse
//         } catch (err) {
//             dispatch(setLoading(false));
//             return { error: err };
//         }
//     };
// };


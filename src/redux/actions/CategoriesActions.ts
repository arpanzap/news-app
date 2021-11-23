import { Dispatch } from "redux";
import { AppActionTypes } from "./ActionTypes";
import { setLoading } from "../creators/LoadingCreator";
import { executeGetRequest } from "../../utils/fetchUtils"
import { RootState } from '..'
import { setList } from "../creators/CategoriesCreators"



export interface ResponseType<T, R> {
    code: number,
    data?: R,
    message?: string,
    validationObject?: T,
}



export const getList = () => {
    return async (dispatch: Dispatch<AppActionTypes>, getState: () => RootState) => {
        try {
            dispatch(setLoading(true));
            const apiResponse = await executeGetRequest(`everything?q=tesla&from=2021-10-22&sortBy=publishedAt&apiKey=2a88da57240541808060b7ea64f79dc7`);
            dispatch(setLoading(false));
            if (apiResponse.code != 200) {
                throw apiResponse.error;
            }
            dispatch(setList(apiResponse.data))
            return apiResponse
        } catch (err) {
            dispatch(setLoading(false));
            return { error: err };
        }
    };
};


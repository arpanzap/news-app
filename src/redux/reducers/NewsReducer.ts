import { ICategory } from "../../models/types";
import { setListActionType } from "../actions/ActionTypes";
import { SET_LIST, CLEAR_ALL } from "../types";

export interface CategoriesState {
    newsList: ICategory[]
}
const INITIAL_STATE: CategoriesState = {
    newsList: []
};

export default (state = INITIAL_STATE, action: setListActionType): CategoriesState => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                newsList: [...action.payload]
            }
        case CLEAR_ALL:
            return INITIAL_STATE
        default:
            return state;
    }
};
import { Categories } from "../../models/Categories";
import { setListActionType } from "../actions/ActionTypes";
import { SET_LIST, CLEAR_ALL } from "../types";

export interface CategoriesState {
    List: Categories[]
}
const INITIAL_STATE: CategoriesState = {
    List: []

};

export default (state = INITIAL_STATE, action: setListActionType): CategoriesState => {
    switch (action.type) {
        case SET_LIST:
            return { ...state, List: action.payload }
        case CLEAR_ALL:
            return INITIAL_STATE

        default:
            return state;
    }
};
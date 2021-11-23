import { Categories } from "../../models/Categories";
import { setListActionType } from "../actions/ActionTypes";
import { SET_LIST } from "../types";



export function setList(newsList: Categories): setListActionType {
    return {
        type: SET_LIST,
        payload: newsList
    };
}



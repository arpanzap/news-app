import { ICategory } from "../../models/types";
import { setListActionType } from "../actions/ActionTypes";
import { SET_LIST } from "../types";



export function setList(newsList: ICategory[]): setListActionType {
    return {
        type: SET_LIST,
        payload: newsList
    };
}



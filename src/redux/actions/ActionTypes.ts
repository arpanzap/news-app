import { Categories } from "../../models/Categories";

export interface setListActionType {
  type: string;
  payload: Categories;
}

export interface LoadingActionType {
  type: string;
  payload: boolean;
}



export type AppActionTypes = setListActionType | LoadingActionType 
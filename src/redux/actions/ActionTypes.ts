import { ICategory } from "../../models/types";

export interface setListActionType {
  type: string;
  payload: ICategory[];
}

export interface LoadingActionType {
  type: string;
  payload: boolean;
}



export type AppActionTypes = setListActionType | LoadingActionType
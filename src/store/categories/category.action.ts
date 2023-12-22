 import {
  CATEGORIES_ACTION_TYPES,
  category,
  categoryItem,
} from "./category.types";
import { Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { withMatcher } from "../../utils/reducer/reducer.utils";
  type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  category[]
>;
type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchCategoriesStart = withMatcher(() =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess =withMatcher( (
  categoriesArray: category[]
): FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  ));


export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

  export type CategoryAction=FetchCategoriesStart|FetchCategoriesSuccess|FetchCategoriesFailed;

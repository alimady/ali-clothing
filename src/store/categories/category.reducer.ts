import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { category } from "./category.types";
import { CategoryAction, fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "./category.action";


export type categoriesState = {
  readonly categories: category[];
   readonly isLoading: boolean;
   readonly error: Error | null;
};
export const CATEGORIES_INITIAL_STATE: categoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction
):categoriesState => {
   
  if (fetchCategoriesStart.match(action)){
    return {...state,isLoading:true}
  }
  if (fetchCategoriesSuccess.match(action)){
    return {...state,categories:action.payload}
  }

  if (fetchCategoriesFailed.match(action)){
    return {...state,error:action.payload}
  }
   
  return state
   }
;

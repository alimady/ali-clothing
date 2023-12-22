export enum CATEGORIES_ACTION_TYPES{
    FETCH_CATEGORIES_START='FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS='FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED='FETCH_CATEGORIES_FAILED',
}


export type categoryItem={
    id:number,
    imageURL:string,
    name:string,
    price:number
}


export type category={
    title:string,
    id:number,
    imageURL:string
    items:categoryItem[]
  }


  export type categoriesMap={
    [key:string]:categoryItem[]
  }

 import { AnyAction } from "redux";

export type Matchable<Ac extends () => AnyAction> = Ac & {
  type: ReturnType<Ac>["type"];
  match(action: AnyAction): action is ReturnType<Ac>;
};

export function withMatcher<Ac extends () => AnyAction & { type: string }>(
  actionCreator: Ac
): Matchable<Ac>;
export function withMatcher<
  Ac extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: Ac): Matchable<Ac>;
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type == type;
    },
  });
}
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

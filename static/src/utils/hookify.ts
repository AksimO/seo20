import { useReducer, Reducer, useEffect, useCallback, useMemo } from "react";

export enum HookifyStateEnum {
  NEW = "new",
  PROGRESS = "progress",
  SUCCESS = "success",
  ERROR = "error",
}

type FetchErrorType = { status: number; payload: Error };

export type HookifyStateType<DataType = Response> = {
  state: HookifyStateEnum;
  data: DataType | null;
  error: FetchErrorType | null;
};
const initialState: HookifyStateType = {
  state: HookifyStateEnum.NEW,
  data: null,
  error: null,
};
type ActionType = {
  type: HookifyStateEnum;
  payload?: any;
};
const reducer = <DataType>(
  state: HookifyStateType<DataType>,
  action: ActionType
) => {
  switch (action.type) {
    case HookifyStateEnum.PROGRESS:
      return {
        ...state,
        state: action.type,
      };
    case HookifyStateEnum.SUCCESS:
      return {
        state: action.type,
        data: action.payload as DataType,
        error: null,
      };
    case HookifyStateEnum.ERROR:
      return {
        state: action.type,
        data: null,
        error: action.payload as FetchErrorType,
      };
  }
  return state;
};
export const hookify = <ArgsType extends Array<unknown>>(
  fn: <ResponseType>(...args: ArgsType) => Promise<ResponseType>,
  { autoRequest = true } = {}
) => {
  return <ResponseType = Response>(...args: ArgsType) => {
    const [state, dispatch] = useReducer<
      Reducer<HookifyStateType<ResponseType>, ActionType>
    >(reducer<ResponseType>, initialState as HookifyStateType<ResponseType>);

    const request = useCallback(
      (...args2: any) => {
        console.log("args", args);
        dispatch({ type: HookifyStateEnum.PROGRESS });
        return fn<ResponseType>(...([...args, ...args2] as any as ArgsType))
          .then((response) => {
            dispatch({ type: HookifyStateEnum.SUCCESS, payload: response });
            return response;
          })
          .catch((error) => {
            dispatch({ type: HookifyStateEnum.ERROR, payload: error });
            return Promise.reject(error);
          });
      },
      [fn, ...args]
    );

    useEffect(() => {
      if (autoRequest) {
        request();
      }
    }, []);

    return useMemo(() => ({ ...state, request }), [request, state]);
  };
};

import React, { PropsWithChildren } from "react";
import { HookifyStateEnum, HookifyStateType } from "~/utils/hookify";

type GetWrapperPropsType = PropsWithChildren<{
  state: Pick<HookifyStateType, "state" | "error">;
}>;
export const GetWrapper = ({ state, children }: GetWrapperPropsType) => {
  return (
    <>
      {state.state === HookifyStateEnum.PROGRESS && (
        <div>
          <p>Loading</p>
          {children}
        </div>
      )}
      {(state.state === HookifyStateEnum.SUCCESS ||
        state.state === HookifyStateEnum.NEW) &&
        children}
      {state.state === HookifyStateEnum.ERROR && (
        <>
          <div>{state.error?.payload.message}</div>
        </>
      )}
    </>
  );
};

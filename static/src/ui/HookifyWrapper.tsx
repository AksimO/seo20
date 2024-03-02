import React, { PropsWithChildren } from "react";
import { HookifyStateEnum, HookifyStateType } from "../utils/hookify";

type GetWrapperPropsType = PropsWithChildren<{
  state: Pick<HookifyStateType, "state" | "error">;
}>;
export const HookifyWrapper = ({ state, children }: GetWrapperPropsType) => {
  return (
    <>
      {state.state === HookifyStateEnum.PROGRESS && <div>{children}</div>}
      {(state.state === HookifyStateEnum.SUCCESS ||
        state.state === HookifyStateEnum.NEW) &&
        children}
      {state.state === HookifyStateEnum.ERROR && (
        <div>{state.error?.payload?.message || "Hz"}</div>
      )}
    </>
  );
};

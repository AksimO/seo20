import React, { FormEventHandler, useCallback, useState } from "react";
import { getFormValues } from "../../utils/formUtils";
import "./Form.css";
import { HookifyWrapper } from "../HookifyWrapper";
import { useSubmit } from "../../utils/fetch";
export const AddWebsiteForm = () => {
  const { request, ...state } = useSubmit("/websites");
  const addWebsiteFn: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const data = getFormValues(event.target as HTMLFormElement);
      console.log("Data", data);
      return request(data);
    },
    []
  );
  return (
    <HookifyWrapper state={state}>
      <form onSubmit={addWebsiteFn} className="form-container">
        <input
          name="origin"
          placeholder="Enter domain"
          className="input-field"
        />
        <input name="topic" placeholder="Enter topic" className="input-field" />
        <button type="submit" className="submit-btn">
          Add
        </button>
      </form>
    </HookifyWrapper>
  );
};

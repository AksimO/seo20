import { WebsiteMetaType } from "../@types/DataModel";
import { useFetch } from "../utils/fetch";
import React from "react";

type WMetaInfoPropsType = {
  w: WebsiteMetaType;
};
const WMetaInfo = ({ w }: WMetaInfoPropsType) => {
  return (
    <div>
      {w.id} - {w.url}
    </div>
  );
};
export const WebsitesList = () => {
  const { data } = useFetch<WebsiteMetaType[]>("/websites");
  return (
    <div>
      <h1>List</h1>
      {data?.map((w) => (
        <WMetaInfo w={w} />
      ))}
    </div>
  );
};

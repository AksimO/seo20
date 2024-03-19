import { WebsiteMetaType } from "../@types/DataModel";
import { useFetch } from "../utils/fetch";
import React from "react";

type WMetaInfoPropsType = {
  w: WebsiteMetaType;
};
const WMetaInfo = ({ w }: WMetaInfoPropsType) => {
  return (
    <tr>
      <td>{w.origin} </td>
      <td>{w.topic}</td>
      <tr> {w.s3path}</tr>
    </tr>
  );
};
export const WebsitesList = () => {
  const { data } = useFetch<WebsiteMetaType[]>("/websites");
  return (
    <div>
      <h1>List</h1>
      <table>
        <thead>
          <tr>
            <td>Website</td>
            <td>Topic</td>
            <td>s3path</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((w) => (
            <WMetaInfo key={w.id} w={w} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

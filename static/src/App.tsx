import React from "react";
import { WebsitesList } from "./ui/WebsitesList";
import { AddWebsiteForm } from "./ui/AddWrbsiteForm/AddWebsiteForm";
export const App = () => {
  return (
    <div>
      <AddWebsiteForm />
      <hr />
      <WebsitesList />
    </div>
  );
};

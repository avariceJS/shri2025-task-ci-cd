import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@bem-react/classname";

const bem = cn("About");

export const About: React.FC = () => {
  console.log('test2')
  console.log('test3')
  console.log('test3')
  return (
    <div className={bem()}>
      <Helmet title="About" />
      <div className="row">
        <div className="col">
          <h1>About</h1>
          <p>
            Author: Slednikov Aleksandr
          </p>
        </div>
      </div>
    </div>
  );
};
